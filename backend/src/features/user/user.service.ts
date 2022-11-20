import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './user.dtos';
import { Hashing } from '../../utils';
import { BaseService } from '../../common/baseService';

@Injectable()
export class UserService extends BaseService {
	getAll() {
		return this.prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
			},
		});
	}
	
	getById(uuid: string) {
		return this.prisma.user.findUnique({
			where: {
				id: uuid,
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
				joinedAt: true,
			},
		});
	}
	
	update(uuid: string, patchDto: Partial<CreateUserDto>) {
		return this.prisma.user.update({
			where: {
				id: uuid,
			},
			data: patchDto,
		})
	}
	
	deleteOne(uuid: string) {
		return this.prisma.user.delete({
			where: {
				id: uuid,
			},
		});
	}
}