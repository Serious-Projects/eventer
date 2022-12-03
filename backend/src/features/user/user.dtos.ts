import { IsString, IsEmail, IsUrl } from "class-validator";
import { Expose } from "class-transformer";

export class CreateUserDto {
   @IsString()
   name: string;

   @IsEmail()
   @IsString()
   email: string;

   @IsString()
   password: string;
   
   @IsString()
   profile?: string;
   
   @IsUrl()
   profileUrl?: string;
}

export class UserDto {
   @Expose() id: string;
   @Expose() name: string;
   @Expose() email: string;
   @Expose() joinedAt: Date;
}
