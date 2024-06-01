import { z } from 'zod';

import { CreateLessonSchema } from './create-lesson-schema';

export const GenerateTimetableSchema = z.object({
  semesterId: z
    .string()
    .refine(id => id.length > 0, { message: 'Semester is required.' }),
  dailySchedules: z.array(
    z.object({
      lessons: z.array(CreateLessonSchema),
      dayOfWeek: z.string().refine(dayOfWeek => dayOfWeek.length > 0, {
        message: 'Day of week is required.',
      }),
    })
  ),
});

export type TGenerateTimetableSchema = z.infer<typeof GenerateTimetableSchema>;
