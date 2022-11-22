import crypto from "node:crypto";
import {
   Body,
   Controller,
   Delete,
   Get,
   HttpCode,
   HttpException,
   NotFoundException,
   Param,
   Patch,
   Post,
   Redirect,
   UseFilters,
   UseGuards,
   UploadedFile,
   UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from "./user.service";
import { AuthService } from "../auth/auth.service";
import { CreateUserDto, UserDto } from "./user.dtos";
import { PrismaExceptionFilter } from "../../common/filters";
import { User, ReqUser } from "../../common/decorators";

@Controller("users")
@UseFilters(PrismaExceptionFilter)
export class UserController {
   constructor(
      private readonly userService: UserService,
      private readonly authService: AuthService
   ) {}

   @UseGuards(AuthGuard("jwt"))
   @Get()
   @HttpCode(200)
   async getUsers() {
      return this.userService.getAll();
   }

   @Get("public/:id")
   @UseGuards(AuthGuard("jwt"))
   @HttpCode(200)
   async getPublicUser(@Param('id') id: string) {
      return await this.userService.getById(id);
   }
   
   @Get("me")
   @UseGuards(AuthGuard("jwt"))
   @HttpCode(200)
   async getUser(@User() user: ReqUser) {
      return {
         id: user.sub,
         name: user.name,
         email: user.email,
      };
   }

   @Post("create")
   @UseInterceptors(FileInterceptor('file'))
   @HttpCode(201)
   async createUser(@UploadedFile() profileImg: Express.Multer.File, @Body() createUserDto: CreateUserDto) {
      const user = await this.userService.create(createUserDto, profileImg);
      if (!user) {
         throw new HttpException("Oops! something went wrong here...", 500);
      }
      const token = await this.authService.createAccessToken(user);
      return { access_token: token };
   }

   @UseGuards(AuthGuard("jwt"))
   @Patch("me/update")
   @HttpCode(201)
   async updateUser(
      @Body() userUpdate: Partial<CreateUserDto>,
      @User() reqUser: ReqUser
   ) {
      const user = await this.userService.update(reqUser.sub, userUpdate);
      if (!user) {
         throw new HttpException("Oops! something went wrong here...", 500);
      }
      return user;
   }

   @UseGuards(AuthGuard("jwt"))
   @Delete("me/remove")
   @HttpCode(204)
   async deleteUser(@User() user: ReqUser) {
      return await this.userService.deleteOne(user.sub);
   }
}
