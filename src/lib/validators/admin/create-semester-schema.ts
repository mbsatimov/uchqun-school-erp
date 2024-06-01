import { z } from 'zod';

export const CreateSemesterSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  portion: z
    .string()
    .refine(portion => portion.length > 0, { message: 'Portion is required.' }),
});

export type TCreateSemesterSchema = z.infer<typeof CreateSemesterSchema>;
