import { z } from 'zod';

export const CreateStudentByFileSchema = z.object({
  file: z
    .custom<FileList>()
    .refine(fileList => fileList.length === 1, 'Select .xlsx file'),
});

export type TCreateStudentByFileSchema = z.infer<
  typeof CreateStudentByFileSchema
>;
