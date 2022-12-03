import * as z from 'zod';

export const signupSchema = z.object({
   name: z.string()
      .nonempty({ message: 'Username is mandatory' })
      .trim(),

   email: z.string()
      .email({ message: 'Email is not a valid email' })
      .nonempty({ message: 'Email is mandatory' })
      .trim(),

   password: z.string()
      .nonempty({ message: 'Please choose a strong password' })
      .min(8, { message: 'Password should be minimum 8 characters long' })
      .trim(),

   confirmPassword: z.string()
      .nonempty({ message: 'Please repeat your password' })
      .trim(),
   
   profile: z.instanceof(File),
}).superRefine(({ password, confirmPassword, profile }, ctx) => {
   if (password !== confirmPassword) {
      ctx.addIssue({
         code: z.ZodIssueCode.custom,
         message: "Password and repeat password don't match!",
         path: ['confirmPassword'],
      });
   }
   
   if (!['jpg', 'png', 'jpeg'].includes(profile.type)) {
      ctx.addIssue({
         code: z.ZodIssueCode.custom,
         message: `Image of type '${profile.type}' is not allowed!`,
         path: ['profile'],
      });
   }
});

export const loginSchema = z.object({
   email: z.string()
      .email({ message: "It's not a valid email" })
      .nonempty({ message: "Email can't be avoided :)" }),

   password: z.string()
      .nonempty({ message: 'Please input a password :)' }),
});
