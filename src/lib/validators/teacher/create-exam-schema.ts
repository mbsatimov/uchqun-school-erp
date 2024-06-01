import { z } from 'zod';

export const CreateExamSchema = z.object({
  name: z
    .string()
    .refine(name => name.length > 0, { message: 'Name is required.' }),
  attempts: z.number().refine(attempts => attempts > 0, {
    message: 'Attempts must be greater than 0.',
  }),
  startDateTime: z.string(),
  endDateTime: z.string(),
  courseId: z.string(),
  teacherId: z.string(),
  semesterId: z.string(),
  groupIds: z.array(z.string()).refine(groupIds => groupIds.length > 0, {
    message: 'Exam must have at least one group.',
  }),
});

export type TCreateExamSchema = z.infer<typeof CreateExamSchema>;
