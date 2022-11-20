import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { LoginDto } from "../auth.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(private authService: AuthService) {
      super({ usernameField: "email" });
   }

   async validate(credentials: LoginDto) {
      const user = await this.authService.validateUser(credentials);
      if (!user) {
         throw new UnauthorizedException();
      }
      return user;
   }
}
