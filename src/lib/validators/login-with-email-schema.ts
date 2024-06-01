import { z } from 'zod';

export const LoginWithEmailSchema = z.object({
  login: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export type TLoginWithEmailSchema = z.infer<typeof LoginWithEmailSchema>;
