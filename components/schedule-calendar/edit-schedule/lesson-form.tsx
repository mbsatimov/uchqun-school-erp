'use client';

import { format } from 'date-fns';
import React from 'react';

import Loading from '@/app/[locale]/loading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { TimePicker } from '@/components/ui/time-picker/time-picker';

import { useLessonForm } from './hooks/useLessonForm';

interface LessonFormProps {
  dailyScheduleId: number;
  lesson?: LessonPreview;
  setLesson?: React.Dispatch<React.SetStateAction<LessonPreview | undefined>>;
}

export const LessonForm: React.FC<LessonFormProps> = ({
  dailyScheduleId,
  lesson,
  setLesson,
}) => {
  const {
    form,
    state: { courses, teachers, allWeeks, createLesson, updateLesson },
    functions: { onSubmit, onCancelUpdate, setAllWeeks },
  } = useLessonForm({
    dailyScheduleId,
    lesson,
    setLesson,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 space-y-2">
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
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start time</FormLabel>
                <FormControl>
                  <TimePicker
                    date={new Date('1212-12-12 ' + field.value)}
                    setDate={date => field.onChange(format(date, 'HH:mm'))}
                  />
                </FormControl>
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
                  <TimePicker
                    date={new Date('1212-12-12 ' + field.value)}
                    setDate={date => field.onChange(format(date, 'HH:mm'))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-2 py-2">
          <Switch
            checked={allWeeks}
            onCheckedChange={value => setAllWeeks(value)}
          />
          <FormLabel>Generate for all next weeks</FormLabel>
        </div>
        <div className="flex justify-end gap-4">
          {!!lesson && (
            <Button onClick={onCancelUpdate} variant="outline">
              Cancel
            </Button>
          )}
          <Button
            disabled={createLesson.isPending}
            isLoading={createLesson.isPending || updateLesson.isPending}
          >
            {lesson ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
