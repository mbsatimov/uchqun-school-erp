'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateStudentAndAddToGroup } from '@/hooks/use-student';
import type { TCreateUserSchema } from '@/lib/validators/admin/create-user-schema';
import { CreateUserSchema } from '@/lib/validators/admin/create-user-schema';
import { EnumRole } from '@/types/user.interface';

interface CreateAndAddStudentProps {
  groupId: number;
}

export const CreateAndAddStudent: React.FC<CreateAndAddStudentProps> = ({
  groupId,
}) => {
  const createStudent = useCreateStudentAndAddToGroup();
  const form = useForm<TCreateUserSchema>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: '',
      surname: '',
      phoneNumber: '',
      password: '',
    },
    mode: 'onTouched',
  });

  function onSubmit(studentData: TCreateUserSchema) {
    createStudent.mutate({
      groupId,
      data: { ...studentData, role: EnumRole.STUDENT },
    });
  }

  useEffect(() => {
    if (createStudent.isSuccess) {
      form.reset();
    }
  }, [createStudent.isSuccess, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input placeholder="Surname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type="submit"
            disabled={createStudent.isPending}
            isLoading={createStudent.isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
