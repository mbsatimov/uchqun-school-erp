import { z } from 'zod';

export const CreateUserByFileSchema = z.object({
  file: z
    .custom<FileList>()
    .refine(fileList => fileList.length === 1, 'Select .xlsx file'),
});

export type TCreateUserByFileSchema = z.infer<typeof CreateUserByFileSchema>;
