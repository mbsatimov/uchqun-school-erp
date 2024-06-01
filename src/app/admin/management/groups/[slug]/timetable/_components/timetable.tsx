'use client';
import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';

import type { TGenerateTimetableSchema } from '@/lib/validators/admin/generate-timetable-schema';

import { TimetableCell } from './timetable-cell';
import { TimetableHeader } from './timetable-header';

interface TimetableProps {
  form: UseFormReturn<TGenerateTimetableSchema>;
}

export const Timetable: FC<TimetableProps> = ({ form }) => {
  const { fields } = useFieldArray({
    control: form.control,
    name: 'dailySchedules',
  });

  return (
    <div className="overflow-x-auto rounded-md border border-border bg-card/30">
      <div className="min-w-[1200px]">
        <TimetableHeader />
        <div className="grid grid-cols-[repeat(7,_1fr)] text-sm">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border-r border-border last:border-none"
            >
              <TimetableCell form={form} dayIndex={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
