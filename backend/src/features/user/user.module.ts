import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthService } from "../auth/auth.service";
import { PrismaService } from "../../prisma.service";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";

@Module({
   imports: [CloudinaryModule],
   controllers: [UserController],
   providers: [PrismaService, UserService, AuthService, JwtService],
   exports: [UserService],
})
export class UserModule {}
