'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateSemester } from '@/hooks/use-semester';
import { portionMap } from '@/lib/constants/portionMap';
import { cn } from '@/lib/utils';
import type { TCreateSemesterSchema } from '@/lib/validators/admin/create-semester-schema';
import { CreateSemesterSchema } from '@/lib/validators/admin/create-semester-schema';

export const CreateSemesterForm = () => {
  const createSemester = useCreateSemester();

  const form = useForm<TCreateSemesterSchema>({
    resolver: zodResolver(CreateSemesterSchema),
    mode: 'onTouched',
    defaultValues: {
      portion: '',
      endDate: undefined,
      startDate: undefined,
    },
  });

  function onSubmit(data: TCreateSemesterSchema) {
    const { portion } = data;
    const startDate = format(data.startDate, 'yyyy-MM-dd');
    const endDate = format(data.endDate, 'yyyy-MM-dd');
    console.log(startDate, endDate);
    createSemester.mutate({ startDate, endDate, portion });
  }

  useEffect(() => {
    form.reset();
  }, [createSemester.isSuccess, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="portion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portion</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select portion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(portionMap).map(portion => (
                    <SelectItem key={portion} value={portion}>
                      {portionMap[portion as Portion]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
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
            disabled={createSemester.isPending}
            isLoading={createSemester.isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
