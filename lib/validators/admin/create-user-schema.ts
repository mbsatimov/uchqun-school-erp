import { z } from 'zod';
const uzbekistanPhoneRegex = new RegExp(/^\+998\d{9}$/);

export const CreateUserSchema = z
  .object({
    name: z
      .string()
      .refine(name => name.length > 0, { message: 'Name is required.' }),
    surname: z
      .string()
      .refine(name => name.length > 0, { message: 'Name is required.' }),
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    phoneNumber: z.string().regex(uzbekistanPhoneRegex, 'Invalid Number!'),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type TCreateUserSchema = z.infer<typeof CreateUserSchema>;
