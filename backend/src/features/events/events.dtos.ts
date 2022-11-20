import { IsDateString, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateEventDto {
	@IsString() title: string;
	@IsString() description: string;
	@IsDateString() beginAt: Date;
	@IsDateString() endAt: Date;
	@IsDateString() deadline: Date;
}

export class EventDto {
	@Expose() id: string;
	@Expose() title: string;
	@Expose() description: string;
	@Expose() beginAt: Date;
	@Expose() endAt: Date;
	@Expose() deadline: Date;
	@Expose() participants: any[];
}