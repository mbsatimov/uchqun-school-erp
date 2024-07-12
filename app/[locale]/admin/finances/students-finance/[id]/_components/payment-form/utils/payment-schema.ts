import { z } from 'zod';

export const paymentSchema = z.object({
  amount: z.string().min(1, { message: 'Amount must be greater than 0' }),
  payedFrom: z.string().min(1),
  comment: z.string().optional(),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
