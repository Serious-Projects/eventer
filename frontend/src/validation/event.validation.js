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

   beginAt: z.string()
      .nonempty({ message: 'Please specify, when is the event going to begin?' }),

   endAt: z.string()
      .nonempty({ message: 'Please specify, when is the event going to end?' }),

   deadline: z.string()
      .nonempty({ message: 'Please specify the deadline for the registration of this event' }),
}).superRefine(({ beginAt, endAt, deadline }, ctx) => {
   // console.log(`Today: ${todaysDate.format()} AND startDate: ${startDate.format()}`);
   if (moment(beginAt).isAfter(todaysDate) || moment(beginAt).format() !== todaysDate.format()) {
      ctx.addIssue({
         code: 'custom',
         path: ['beginAt'],
         message: "Please choose today's date or a date in future",
      });
   }

   if (moment(endAt).isBefore(beginAt)) {
      ctx.addIssue({
         code: 'custom',
         path: ['endAt'],
         message: 'Cannot end an event before beginning it',
      });
   }

   if (!moment(deadline).isBetween(moment(beginAt), moment(endAt))) {
      ctx.addIssue({
         code: 'custom',
         path: ['deadline'],
         message: 'Deadline must be set after the creation and before the end of the event',
      });
   }
});
