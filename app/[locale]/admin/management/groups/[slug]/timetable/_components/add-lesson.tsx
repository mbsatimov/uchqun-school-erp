'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

import Loading from '@/app/[locale]/loading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useGetAllCourses } from '@/hooks/use-course';
import { useCreateLesson } from '@/hooks/use-lesson';
import { useGetAllTeachers } from '@/hooks/use-teacher';
import { DefaultError } from '@/lib/exceptions/default-exception';
import type { TCreateLessonSchema } from '@/lib/validators/admin/create-lesson-schema';
import { CreateLessonSchema } from '@/lib/validators/admin/create-lesson-schema';

interface AddLessonProps {
  dailyScheduleId: number;
}

export const AddLesson: React.FC<AddLessonProps> = ({ dailyScheduleId }) => {
  const createLesson = useCreateLesson(dailyScheduleId);
  const courses = useGetAllCourses();
  const teachers = useGetAllTeachers();
  const [allWeeks, setAllWeeks] = React.useState(false);

  const form = useForm<TCreateLessonSchema>({
    resolver: zodResolver(CreateLessonSchema),
    mode: 'onTouched',
    defaultValues: {
      courseId: '',
      teacherId: '',
      startTime: '',
      endTime: '',
    },
  });

  const onSubmit = (data: TCreateLessonSchema) => {
    const convertedData = {
      courseId: Number(data.courseId),
      teacherId: Number(data.teacherId),
      startTime: data.startTime,
      endTime: data.endTime,
    };

    createLesson
      .mutateAsync({
        dailyScheduleId,
        allWeeks,
        data: convertedData,
      })
      .then(() => {
        if (createLesson.isSuccess) form.reset();
      });
  };

  if (courses.isError || teachers.isError) throw new DefaultError();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Course</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courses.isLoading ? (
                    <Loading />
                  ) : (
                    courses.data?.map(course => (
                      <SelectItem key={course.id} value={String(course.id)}>
                        {course.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teacherId"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Teacher</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teachers.isLoading ? (
                    <Loading />
                  ) : (
                    teachers.data?.map(teacher => (
                      <SelectItem key={teacher.id} value={String(teacher.id)}>
                        {teacher.name} {teacher.surname}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start time</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="HH:mm"
                  autoComplete="off"
                  className="text-center"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End time</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="HH:mm"
                  autoComplete="off"
                  className="text-center"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex items-center gap-2">
          <Switch
            checked={allWeeks}
            onCheckedChange={value => setAllWeeks(value)}
          />
          <FormLabel>Generate to all next weeks</FormLabel>
          <Button
            size={'icon'}
            disabled={createLesson.isPending}
            className="ml-auto"
          >
            {createLesson.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Plus />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
