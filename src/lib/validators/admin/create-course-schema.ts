import { z } from 'zod';

export const CreateCourseSchema = z.object({
  name: z
    .string()
    .refine(name => name.length > 0, { message: 'Name is required.' }),
});

export type TCreateCourseSchema = z.infer<typeof CreateCourseSchema>;
