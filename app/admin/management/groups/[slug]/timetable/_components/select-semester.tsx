import Link from 'next/link';
import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { useGetAllGlobalSemesters } from '@/hooks/use-semester';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { cn } from '@/lib/utils';
import type { TGenerateTimetableSchema } from '@/lib/validators/admin/generate-timetable-schema';
import { EnumPortion } from '@/types/semester.interface';
import Loading from '@/app/loading';
import { buttonVariants } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectSemesterProps {
  form: UseFormReturn<TGenerateTimetableSchema>;
}

export const SelectSemester: FC<SelectSemesterProps> = ({ form }) => {
  const semesters = useGetAllGlobalSemesters();

  if (semesters.isError) throw new DefaultError();

  return (
    <FormField
      control={form.control}
      name="semesterId"
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} value={String(field.value)}>
            <FormControl>
              <SelectTrigger className="max-w-[300px]">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {semesters.isLoading ? (
                <Loading />
              ) : semesters.data?.length === 0 ? (
                <Link
                  href="/admin/management/semesters"
                  className={cn(
                    'w-full justify-between',
                    buttonVariants({ variant: 'link' })
                  )}
                >
                  create semester
                </Link>
              ) : (
                semesters.data?.map(semester => (
                  <SelectItem
                    className="truncate"
                    key={semester.id}
                    value={String(semester.id)}
                  >
                    {EnumPortion[semester.portion]}
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({semester.startDate} - {semester.endDate})
                    </span>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
