'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormDescription } from '@/components/ui/form';
import { useGenerateTimeTable } from '@/hooks/use-semester';
import type { TGenerateTimetableSchema } from '@/lib/validators/admin/generate-timetable-schema';
import { GenerateTimetableSchema } from '@/lib/validators/admin/generate-timetable-schema';
import type { IDailyScheduleCreate } from '@/types/daily-schedule.interface';
import { EnumDay } from '@/types/daily-schedule.interface';

import { SelectSemester } from './select-semester';
import { Timetable } from './timetable';

interface AddSemesterToGroupProps {
  groupId: number;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const initialDailySchedules = Object.values(EnumDay).map(day => ({
  dayOfWeek: day,
  lessons: [],
}));

export const AssignSemesterToGroupForm: FC<AddSemesterToGroupProps> = ({
  groupId,
  setShowForm,
}) => {
  const createSemester = useGenerateTimeTable();

  const form = useForm<TGenerateTimetableSchema>({
    resolver: zodResolver(GenerateTimetableSchema),
    defaultValues: {
      semesterId: '',
      dailySchedules: initialDailySchedules,
    },
  });

  function onSubmit(data: TGenerateTimetableSchema) {
    const dailySchedules: Array<IDailyScheduleCreate> = data.dailySchedules.map(
      day => {
        return {
          ...day,
          lessons: day.lessons.map(lesson => {
            return {
              ...lesson,
              courseId: Number(lesson.courseId),
              teacherId: Number(lesson.teacherId),
            };
          }),
        };
      }
    );
    createSemester.mutate({
      groupId,
      semesterId: Number(data.semesterId),
      dailySchedules,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="mb-3 text-xl font-medium">Generate timetable</h2>
        <SelectSemester form={form} />
        <Timetable form={form} />
        <div className="flex items-center justify-between">
          <FormDescription>
            Generate timetable for selected semester. After generating, you can
            edit it later.
          </FormDescription>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant={'secondary'}
              onClick={() => {
                setShowForm(false);
                form.reset();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createSemester.isPending}
              isLoading={createSemester.isPending}
            >
              Generate
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
