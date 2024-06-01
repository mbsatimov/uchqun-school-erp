'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateUserByFile } from '@/hooks/use-user';
import type { TCreateUserByFileSchema } from '@/lib/validators/admin/create-user-by-file-schema';
import { CreateUserByFileSchema } from '@/lib/validators/admin/create-user-by-file-schema';
import type { EnumRole } from '@/types/user.interface';

interface CreateUserWithExcelProps {
  role: EnumRole;
}

export const CreateUserWithExcel: React.FC<CreateUserWithExcelProps> = ({
  role,
}) => {
  const createUserWithExcel = useCreateUserByFile(role);

  const form = useForm<TCreateUserByFileSchema>({
    resolver: zodResolver(CreateUserByFileSchema),
  });

  const onSubmit = (data: TCreateUserByFileSchema) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);
    createUserWithExcel.mutate({ data: formData, role });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormItem>
          <FormLabel
            className={form.formState.errors.file ? 'text-destructive' : ''}
          >
            Excel file
          </FormLabel>
          <FormControl>
            <Input
              placeholder="Excel file"
              type="file"
              {...form.register('file')}
            />
          </FormControl>
          {form.formState.errors.file && (
            <FormMessage>{form.formState.errors.file.message}</FormMessage>
          )}
        </FormItem>
        <DialogFooter>
          <Button
            type="submit"
            disabled={createUserWithExcel.isPending}
            isLoading={createUserWithExcel.isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
