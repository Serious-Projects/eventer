import { Injectable, BadRequestException } from "@nestjs/common";
import { CreateUserDto } from "./user.dtos";
import { Hashing } from "../../utils";
import { BaseService } from "../../common/baseService";
import { AuthService } from "../auth/auth.service";
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UserService extends BaseService {
   constructor(private cloudinary: CloudinaryService) {}
   
   getAll() {
      return this.prisma.user.findMany({
         select: {
            id: true,
            name: true,
            email: true,
         },
      });
   }

   getById(uuid: string) {
      return this.prisma.user.findUnique({
         where: {
            id: uuid,
         },
      });
   }

   getByEmail(email: string) {
      return this.prisma.user.findUnique({
         where: { email },
      });
   }

   async create(userDto: CreateUserDto, profileImg: Express.Multer.File) {
      const { password, ...rest } = userDto;
      const { salt, hashed } = Hashing.hashPassword(password);
      
      await this.uploadImageToCloudinary(profileImg);
      
      return this.prisma.user.create({
         data: {
            salt,
            password: hashed,
            ...rest,
         },
         select: {
            id: true,
            name: true,
            email: true,
         },
      });
   }

   update(uuid: string, patchDto: Partial<CreateUserDto>) {
      return this.prisma.user.update({
         where: {
            id: uuid,
         },
         data: patchDto,
      });
   }

   deleteOne(uuid: string) {
      return this.prisma.user.delete({
         where: {
            id: uuid,
         },
      });
   }
   
   async uploadImageToCloudinary(file: Express.Multer.File) {
      return await this.cloudinary.uploadImage(file).catch(() => {
         throw new BadRequestException('Invalid file type.');
      });
   }
}
