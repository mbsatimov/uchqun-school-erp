'use client';

import { Plus, Trash } from 'lucide-react';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';

import { useGetAllCourses } from '@/hooks/use-course';
import { useGetAllTeachers } from '@/hooks/use-teacher';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { cn } from '@/lib/utils';
import type { TGenerateTimetableSchema } from '@/lib/validators/admin/generate-timetable-schema';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TimetableCellProps {
  form: UseFormReturn<TGenerateTimetableSchema>;
  dayIndex: number;
}

export const TimetableCell: React.FC<TimetableCellProps> = ({
  form,
  dayIndex,
}) => {
  const teachers = useGetAllTeachers();
  const courses = useGetAllCourses();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `dailySchedules.${dayIndex}.lessons`,
  });

  if (teachers.isError || courses.isError) throw new DefaultError();

  return (
    <>
      <div className="min-h-[200px] space-y-2 p-1">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="group relative space-y-1 rounded-md bg-green-500/20 p-1"
          >
            <span
              className={cn(
                'invisible absolute left-[100%] top-0 z-50 pb-5 pt-2 transition duration-500 group-hover:visible group-hover:opacity-100 group-hover:transition-none',
                { 'left-auto right-[100%]': dayIndex === 6 }
              )}
            >
              <Button
                variant={'destructive'}
                size={'icon'}
                onClick={() => remove(index)}
                className={cn('ml-1 h-8 w-8', { 'ml-0 mr-1': dayIndex === 6 })}
              >
                <Trash size={16} />
              </Button>
            </span>
            <FormField
              control={form.control}
              name={`dailySchedules.${dayIndex}.lessons.${index}.courseId`}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="h-auto border-none bg-transparent px-2 py-1 outline-none hover:bg-white/20 focus:outline-none">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.data?.map(course => (
                        <SelectItem
                          className="truncate"
                          key={course.id}
                          value={String(course.id)}
                        >
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`dailySchedules.${dayIndex}.lessons.${index}.teacherId`}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="h-auto border-none bg-transparent px-2 py-1 outline-none hover:bg-white/20 focus:outline-none">
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teachers.data?.map(teacher => (
                        <SelectItem
                          className="truncate"
                          key={teacher.id}
                          value={String(teacher.id)}
                        >
                          {teacher.name} {teacher.surname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
            <div className="flex gap-1">
              <FormField
                control={form.control}
                name={`dailySchedules.${dayIndex}.lessons.${index}.startTime`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Start time"
                        autoComplete="off"
                        className="h-auto p-1 px-2 text-center placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`dailySchedules.${dayIndex}.lessons.${index}.endTime`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="End time"
                        autoComplete="off"
                        className="h-auto p-1 px-2 text-center placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
        <Tooltip>
          <TooltipTrigger
            asChild
            className="mx-auto my-2 flex items-center justify-center"
          >
            <Button
              type="button"
              variant="outline"
              size={'icon'}
              onClick={() =>
                append({
                  teacherId: '',
                  courseId: '',
                  startTime: '',
                  endTime: '',
                })
              }
            >
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add new Lesson</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
};
