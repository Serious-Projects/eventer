import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { LoginDto } from "./auth.dto";
import { Hashing } from "../../utils";
import { User, ReqUser } from "../../common/decorators";

@Injectable()
export class AuthService {
   constructor(private userService: UserService, private jwtService: JwtService, private env: ConfigService) {}

   async validateUser({ email, password }: LoginDto) {
      const user = await this.userService.getByEmail(email);
      if (user) {
         const { password: hashed, salt, ...rest } = user;
         if (Hashing.verifyPassword(password, salt, hashed)) {
            const { modifiedAt, ...result } = rest;
            try {
               const token = await this.createAccessToken(result);
               return { access_token: token };
            } catch (err) {
               console.log(err);
               return {};
            }
         }
      }
      return null;
   }

   async createAccessToken(user: any) {
      const payload = {
         sub: user.id,
         name: user.name,
         email: user.email,
      };
      const token = this.jwtService.sign(payload, {
         secret: this.env.get("JWT_SECRET"),
         expiresIn: this.env.get("JWT_EXP"),
      });
      return token;
   }
}
