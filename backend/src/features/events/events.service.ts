import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateEventDto } from "./events.dtos";
import { BaseService } from "../../common/baseService";
import { RelationExistsException, RelationDoesNotExistsException } from "../../common/exceptions";

const UserNotFoundException = new NotFoundException("User not found");
const EventNotFoundException = new NotFoundException("Event not found");

@Injectable()
export class EventsService extends BaseService {
   async getUserEvents(userId: string) {
      if (!(await this.userExists(userId))) throw UserNotFoundException;
      return this.prisma.user.findUnique({
         where: { id: userId },
         select: { events: true },
      });
   }

   getPublic() {
      return this.prisma.event.findMany();
   }

   create(userId: string, event: Prisma.EventCreateInput) {
      return this.prisma.event.create({
         data: event,
      });
   }

   async getById(eventId: string) {
      if (!(await this.eventExists(eventId))) throw EventNotFoundException;
      return this.prisma.event.findUnique({
         where: { id: eventId },
         include: {
            participants: {
               select: {
                  id: true,
                  name: true,
                  email: true,
               },
            },
         },
      });
   }

   async enrollIn(eventId: string, userId: string) {
      if (!(await this.userExists(userId))) throw UserNotFoundException;
      if (!(await this.eventExists(eventId))) throw EventNotFoundException;
      if (await this.isUserEnrolledInEvent(userId, eventId)) {
         throw new RelationExistsException("Already registerd for this event");
      }
      return this.prisma.event.update({
         where: { id: eventId },
         data: {
            participants: {
               connect: { id: userId },
            },
         },
         select: { id: true },
      });
   }

   async withdrawParticipation(eventId: string, userId: string) {
      if (!(await this.userExists(userId))) throw UserNotFoundException;
      if (!(await this.eventExists(eventId))) throw EventNotFoundException;
      if (!(await this.isUserEnrolledInEvent(userId, eventId))) {
         throw new RelationDoesNotExistsException("You are not enrolled to this event");
      }
      return this.prisma.event.update({
         where: { id: eventId },
         data: {
            participants: {
               disconnect: { id: userId },
            },
         },
         select: { id: true },
      });
   }
}
