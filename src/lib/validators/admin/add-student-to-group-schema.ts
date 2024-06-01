import { z } from 'zod';

export const AddStudentToGroupSchema = z.object({
  studentId: z
    .string()
    .refine(id => id.length > 0, { message: 'Please, select a student.' }),
});

export type TAddStudentToGroupSchema = z.infer<typeof AddStudentToGroupSchema>;
