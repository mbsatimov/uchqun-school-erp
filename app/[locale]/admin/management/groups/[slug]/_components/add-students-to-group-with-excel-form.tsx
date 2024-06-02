'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';

import { useCreateStudentAndAddToGroupByFile } from '@/hooks/use-student';
import type { TCreateStudentByFileSchema } from '@/lib/validators/admin/create-student-by-file-schema';
import { CreateStudentByFileSchema } from '@/lib/validators/admin/create-student-by-file-schema';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CreateStudentAndAddToGroupWithExcelProps {
  groupId: number;
}

export const CreateStudentAndAddToGroupWithExcel: FC<
  CreateStudentAndAddToGroupWithExcelProps
> = ({ groupId }) => {
  const createStudentWithExcel = useCreateStudentAndAddToGroupByFile();

  const form = useForm<TCreateStudentByFileSchema>({
    resolver: zodResolver(CreateStudentByFileSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: TCreateStudentByFileSchema) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);
    createStudentWithExcel.mutate({ groupId, data: formData });
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <Label className={form.formState.errors.file ? 'text-destructive' : ''}>
        Excel file
      </Label>
      <Input placeholder="Excel file" type="file" {...form.register('file')} />
      {form.formState.errors.file && (
        <p className="text-destructive">{form.formState.errors.file.message}</p>
      )}
      <DialogFooter>
        <Button
          type="submit"
          disabled={createStudentWithExcel.isPending}
          isLoading={createStudentWithExcel.isPending}
        >
          Save
        </Button>
      </DialogFooter>
    </form>
  );
};
