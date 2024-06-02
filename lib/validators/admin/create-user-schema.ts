import { z } from 'zod';
const uzbekistanPhoneRegex = new RegExp(/^\+998\d{9}$/);

export const CreateUserSchema = z.object({
  name: z
    .string()
    .refine(name => name.length > 0, { message: 'Name is required.' }),
  surname: z
    .string()
    .refine(name => name.length > 0, { message: 'Name is required.' }),
  phoneNumber: z.string().regex(uzbekistanPhoneRegex, 'Invalid Number!'),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

export type TCreateUserSchema = z.infer<typeof CreateUserSchema>;
