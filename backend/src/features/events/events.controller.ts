import {
   Body,
   Controller,
   Get,
   HttpCode,
   HttpException,
   NotFoundException,
   Param,
   Patch,
   Post,
   UseFilters,
   UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Prisma } from "@prisma/client";
import { EventsService } from "./events.service";
import { CreateEventDto, EventDto } from "./events.dtos";
import { PrismaExceptionFilter } from "../../common/filters";
import { User, ReqUser } from "../../common/decorators";

@Controller("events")
@UseFilters(PrismaExceptionFilter)
export class EventsController {
   constructor(private readonly eventsService: EventsService) {}

   @Get("public")
   async getPublicEvents() {
      return await this.eventsService.getPublic();
   }

   @UseGuards(AuthGuard("jwt"))
   @Get("my")
   async getUserEvents(@User() currUser: ReqUser) {
      const { events } = await this.eventsService.getUserEvents(currUser.sub);
      return events;
   }

   @UseGuards(AuthGuard("jwt"))
   @Get("my/:eventId")
   async getEventById(@Param("eventId") eventId: string) {
      return await this.eventsService.getById(eventId);
   }

   @UseGuards(AuthGuard("jwt"))
   @Post("create")
   @HttpCode(201)
   async createEvent(@User() currUser: ReqUser, @Body() event: CreateEventDto) {
      return await this.eventsService.create(currUser.sub, event);
   }

   @UseGuards(AuthGuard("jwt"))
   @Get("enroll/:eventId")
   @HttpCode(200)
   async participateIn(@Param("eventId") eventId: string, @User() user: ReqUser) {
      const currentUserId = user.sub;
      return await this.eventsService.enrollIn(eventId, currentUserId);
   }

   @UseGuards(AuthGuard("jwt"))
   @Get("withdraw/:eventId")
   @HttpCode(200)
   async withdrawParticipation(@Param("eventId") eventId: string, @User() user: ReqUser) {
      const currentUserId = user.sub;
      return await this.eventsService.withdrawParticipation(eventId, currentUserId);
   }
   
   @UseGuards(AuthGuard("jwt"))
   @Get("check-participation/:eventId")
   @HttpCode(200)
   async checkParticipation(@Param("eventId") eventId: string, @User() user: ReqUser) {
      const userId = user.sub;
      const isParticipant = await this.eventsService.isParticipant(userId, eventId);
      return { isEnrolled: isParticipant };
   }
}
