import * as z from 'zod';
import moment from 'moment';

const todaysDate = moment().set({ hours: 0, minutes: 0, seconds: 0 });

export const createEventSchema = z.object({
   title: z.string()
      .nonempty({ message: 'Please specify, what should this event be called?' })
      .trim(),

   description: z.string()
      .nonempty({ message: 'Please describe this event!' })
      .trim(),

   startDate: z.string()
      .nonempty({ message: 'Please specify, when is the event going to begin?' }),

   endDate: z.string()
      .nonempty({ message: 'Please specify, when is the event going to end?' }),

   deadline: z.string()
      .nonempty({ message: 'Please specify the deadline for the registration of this event' }),
}).superRefine(({ startDate, endDate, deadline }, ctx) => {
   // console.log(`Today: ${todaysDate.format()} AND startDate: ${startDate.format()}`);
   if (moment(startDate).isAfter(todaysDate) || moment(startDate).format() !== todaysDate.format()) {
      ctx.addIssue({
         code: 'custom',
         path: ['startDate'],
         message: "Please choose today's date or a date in future",
      });
   }

   if (moment(endDate).isBefore(startDate)) {
      ctx.addIssue({
         code: 'custom',
         path: ['endDate'],
         message: 'Cannot end an event before beginning it',
      });
   }

   if (!moment(deadline).isBetween(startDate, endDate)) {
      ctx.addIssue({
         code: 'custom',
         path: ['deadline'],
         message: 'Deadline must be set after the creation and before the end of the event',
      });
   }
});
