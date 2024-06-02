'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useCreateCourse } from '@/hooks/use-course';
import type { TCreateCourseSchema } from '@/lib/validators/admin/create-course-schema';
import { CreateCourseSchema } from '@/lib/validators/admin/create-course-schema';
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

export const CreateCourseForm = () => {
  const createCourse = useCreateCourse();

  const form = useForm<TCreateCourseSchema>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onTouched',
  });

  function onSubmit(data: TCreateCourseSchema) {
    createCourse.mutate(data);
  }

  useEffect(() => {
    form.reset();
  }, [createCourse.isSuccess, form]);

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
        <DialogFooter>
          <Button
            type="submit"
            disabled={createCourse.isPending}
            isLoading={createCourse.isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
