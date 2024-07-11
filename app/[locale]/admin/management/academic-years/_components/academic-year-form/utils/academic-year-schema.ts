import { z } from 'zod';

export const academicYearSchema = z.object({
  name: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
});

export type AcademicYearSchema = z.infer<typeof academicYearSchema>;
