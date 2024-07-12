'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  GET_ACADEMIC_YEARS_QUERY_KEY,
  usePostAcademicYearsMutation,
  usePutAcademicYearsIdMutation,
} from '@/utils/api';

import {
  AcademicYearSchema,
  academicYearSchema,
} from './utils/academic-year-schema';

type Props = {
  defaultData?: AcademicYear;
};

export const AcademicYearForm = ({ defaultData }: Props) => {
  const form = useForm<AcademicYearSchema>({
    resolver: zodResolver(academicYearSchema),
    mode: 'onTouched',
    defaultValues: defaultData
      ? {
          name: defaultData.name,
          endDate: new Date(defaultData.endDate),
          startDate: new Date(defaultData.startDate),
        }
      : {
          name: '',
          endDate: undefined,
          startDate: undefined,
        },
  });

  const queryClient = useQueryClient();

  const postAcademicYearsMutation = usePostAcademicYearsMutation({
    options: {
      onSuccess: () => {
        form.reset();
        toast.success('Academic year created successfully');
        queryClient.invalidateQueries({
          queryKey: [GET_ACADEMIC_YEARS_QUERY_KEY],
        });
      },
      onError: () => {
        toast.error('Failed to create academic year');
      },
    },
  });
  const putAcademicYearsMutation = usePutAcademicYearsIdMutation({
    options: {
      onSuccess: () => {
        toast.success('Academic year updated successfully');
        queryClient.invalidateQueries({
          queryKey: [GET_ACADEMIC_YEARS_QUERY_KEY],
        });
      },
      onError: () => {
        toast.error('Failed to update academic year');
      },
    },
  });

  function onSubmit(data: AcademicYearSchema) {
    const startDate = format(data.startDate, 'yyyy-MM-dd');
    const endDate = format(data.endDate, 'yyyy-MM-dd');
    const code =
      'YEAR_' + startDate.substring(0, 4) + '_' + endDate.substring(2, 4);
    const payload = { ...data, startDate, endDate, academicYearCode: code };
    defaultData
      ? putAcademicYearsMutation.mutate({ id: defaultData.id, data: payload })
      : postAcademicYearsMutation.mutate({
          data: payload,
        });
  }

  useEffect(() => {
    form.reset();
  }, [postAcademicYearsMutation.isSuccess, form]);

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
                <Input placeholder="Enter name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    ISOWeek
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <FormMessage />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    ISOWeek
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type="submit"
            disabled={
              postAcademicYearsMutation.isPending ||
              putAcademicYearsMutation.isPending
            }
            isLoading={
              postAcademicYearsMutation.isPending ||
              putAcademicYearsMutation.isPending
            }
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
