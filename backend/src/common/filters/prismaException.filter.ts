import {
	ArgumentsHost,
	Catch,
	ConflictException,
	ExceptionFilter,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
	catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		let statusCode, errorObj;
		
		if (exception.code === 'P2001') {
			errorObj = new NotFoundException();
			statusCode = errorObj.status;
		} else if (exception.code === 'P2002') {
			errorObj = new ConflictException(`${exception.meta.target[0]} is already taken`);
			statusCode = errorObj.status;
		} else {
			console.log('Unhandled Code:', exception.code);
			errorObj = new InternalServerErrorException();
			console.log(exception);
			statusCode = errorObj.status;
		}
		
		response.status(statusCode).json(errorObj.response);
	}
}