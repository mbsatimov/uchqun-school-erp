import { z } from 'zod';

export const studentFinancesSchema = z.object({
  studentId: z.string().min(1, { message: 'Required' }),
  paymentPlanId: z.string().min(1, { message: 'Required' }),
  academicYearId: z.string().min(1, { message: 'Required' }),
  contractId: z.string().min(1, { message: 'Required' }),
  studentJoinedDate: z.date(),
});

export type StudentFinancesSchema = z.infer<typeof studentFinancesSchema>;
