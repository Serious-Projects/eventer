import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';

export class BaseService {
	protected readonly prisma: PrismaService;
	protected readonly env: ConfigService;
	
	constructor() {
		this.prisma = new PrismaService();
		this.env = new ConfigService();
	}
	
	private async exists<T extends { count: any }>(model: T, query: Prisma.UserCountOutputTypeCountEventsArgs) {
		const doesExist = await model.count(query);
		return Boolean(doesExist);
	}
	
	protected async isUserEnrolledInEvent(userId: string, eventId: string) {
		const result = await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				events: {
					where: {
						id: eventId,
					},
				},
			},
		});
		return Boolean(result.events.length);
	}
	
	protected eventExists(eventId: string) {
		return this.exists(this.prisma.event, {
			where: {
				id: eventId,
			},
		});
	}
	
	protected userExists(userId: string) {
		return this.exists(this.prisma.user, {
			where: {
				id: userId,
			},
		});
	}
}