import { z } from 'zod';

export const LoginWithPhoneSchema = z.object({
  login: z.string().regex(/^\+998\d{9}$/, 'Invalid Number!'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export type TLoginWithPhoneSchema = z.infer<typeof LoginWithPhoneSchema>;
