import { z } from 'zod';

export const paymentPlanSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  price: z.string().min(1, { message: 'Price is required' }),
});

export type PaymentPlanSchema = z.infer<typeof paymentPlanSchema>;
