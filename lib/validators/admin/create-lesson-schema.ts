import { z } from 'zod';

const timeRegex = new RegExp(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);

export const CreateLessonSchema = z
  .object({
    courseId: z
      .string()
      .refine(id => id.length > 0, { message: 'Course is required.' }),
    teacherId: z
      .string()
      .refine(id => id.length > 0, { message: 'Teacher is required.' }),
    startTime: z
      .string()
      .refine(time => time.length > 0 && timeRegex.test(time), {
        message: 'HH:mm',
      }),
    endTime: z
      .string()
      .refine(time => time.length > 0 && timeRegex.test(time), {
        message: 'HH:mm',
      }),
  })
  .refine(data => data.startTime < data.endTime, {
    message: 'Start time must be before end time.',
    path: ['endTime'],
  });

export type TCreateLessonSchema = z.infer<typeof CreateLessonSchema>;
