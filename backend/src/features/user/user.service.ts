import { Injectable, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDto } from "./user.dtos";
import { Hashing } from "../../utils";
import { BaseService } from "../../common/baseService";
import { AuthService } from "../auth/auth.service";
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UserService extends BaseService {
   constructor(private cloudinary: CloudinaryService) {
      super();
   }
   
   getAll() {
      return this.prisma.user.findMany({
         select: {
            id: true,
            name: true,
            email: true,
            profile: true,
            profileUrl: true,
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

   create(userDto: CreateUserDto) {
      const { password, ...rest } = userDto;
      const { salt, hashed } = Hashing.hashPassword(password);
      
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
            profile: true,
            profileUrl: true,
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
   
   uploadImageToCloudinary(file: Express.Multer.File) {
      return this.cloudinary.uploadImage(file).catch((err) => {
         throw new BadRequestException(err.message);
      });
   }
   
   async updateUserProfilePicture(oldImage: string, newImage: Express.Multer.File) {
      try {
         const oldImageResult = await this.cloudinary.deleteImage(oldImage);
         if (oldImageResult.result === 'not found') {
            throw new BadRequestException('old-image not found');
         }
         const { url, secure_url, public_id, format } = await this.uploadImageToCloudinary(newImage);
         return { url, secure_url, public_id, format };
      } catch (err) {
         throw new BadRequestException(err.message);
      }
   }
}
