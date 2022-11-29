import { Body, Controller, Post, NotFoundException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./auth.dto";

@Controller("v1/auth")
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post("login")
   async login(@Body() credentials: LoginDto) {
      const user = await this.authService.validateUser(credentials);
      if (!user) throw new NotFoundException('You have not created an account yet! Please register and comeback.');
      return user;
   }
}
