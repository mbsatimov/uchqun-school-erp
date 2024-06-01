import { z } from 'zod';

export const CreateGroupSchema = z.object({
  name: z
    .string()
    .refine(name => name.length > 0, { message: 'Name is required.' }),
  establishedDate: z.date(),
});

export type TCreateGroupSchema = z.infer<typeof CreateGroupSchema>;
