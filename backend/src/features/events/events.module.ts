import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { PrismaService } from '../../prisma.service';

@Module({
	imports: [],
	controllers: [EventsController],
	providers: [EventsService, PrismaService],
})
export class EventsModule {}