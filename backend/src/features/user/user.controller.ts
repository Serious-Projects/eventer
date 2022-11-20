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
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
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

   @Get("me")
   @UseGuards(AuthGuard("jwt"))
   @HttpCode(200)
   async getUser(@User() user: ReqUser) {
      return user;
   }

   @Post("create")
   @HttpCode(201)
   async createUser(@Body() createUserDto: CreateUserDto) {
      const user = await this.userService.create(createUserDto);
      if (!user) {
         throw new HttpException("Oops! something went wrong here...", 500);
      }
      return user;
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
