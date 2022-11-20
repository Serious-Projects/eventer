import { Body, Controller, Post, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';

@Controller('v1/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	
	@Post('login')
	async login(@Body() credentials: LoginDto) {
		const token = await this.authService.validateUser(credentials);
		if (!token) throw new HttpException('Please check your credentials', 403);
		return token;
	}
}