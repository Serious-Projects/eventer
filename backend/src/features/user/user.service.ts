import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
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
         select: {
            id: true,
            name: true,
            email: true,
            profile: true,
            profileUrl: true,
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
         select: {
            id: true,
            name: true,
            email: true,
            profile: true,
            profileUrl: true,
         },
      });
   }

   deleteOne(uuid: string) {
      return this.prisma.user.delete({
         where: {
            id: uuid,
         },
         select: {
            id: true,
            name: true,
            email: true,
         },
      });
   }
   
   uploadImageToCloudinary(file: Express.Multer.File, publicId?: string) {
      return this.cloudinary.uploadImage(file, publicId && publicId).catch((err) => {
         throw new BadRequestException(err.message);
      });
   }
   
   async updateUserProfilePicture(oldImage: string, newImage: Express.Multer.File, userId: string) {
      if (newImage && newImage.buffer) {
         try {
            const oldImageResult = await this.cloudinary.deleteImage(oldImage);
            if (oldImageResult.result === 'not found') {
               throw new NotFoundException('old-image not found');
            }
            const { public_id } = await this.uploadImageToCloudinary(newImage, oldImage);
            return { publicId: public_id };
         } catch (err) {
            throw new BadRequestException(err.message);
         }
      }
      throw new BadRequestException('image was not provided or is corrupted');
   }
}
