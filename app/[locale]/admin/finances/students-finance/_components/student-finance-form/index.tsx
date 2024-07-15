'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  GET_STUDENT_FIANCES_QUERY_KEY,
  usePostStudentFinancesMutation,
  usePutStudentFinancesIdMutation,
} from '@/utils/api';

import { AcademicYearSelect } from './components/academic-year-select';
import { PaymentPlanSelect } from './components/payment-plan-select';
import { StudentCombobox } from './components/student-combobox';
import {
  StudentFinancesSchema,
  studentFinancesSchema,
} from './utils/validation-schema';

type Props = {
  defaultData?: StudentFinance;
};

export const StudentFinanceForm = ({ defaultData }: Props) => {
  const form = useForm<StudentFinancesSchema>({
    resolver: zodResolver(studentFinancesSchema),
    mode: 'onTouched',
    defaultValues: defaultData
      ? {
          studentId: String(defaultData.student.id),
          academicYearId: String(defaultData.academicYear.id),
          contractId: String(defaultData.contractId),
          paymentPlanId: String(defaultData.paymentPlan.id),
        }
      : {
          studentId: '',
          academicYearId: '',
          contractId: '',
          paymentPlanId: '',
        },
  });

  const queryClient = useQueryClient();

  const postStudentFinancesMutation = usePostStudentFinancesMutation({
    options: {
      onSuccess: () => {
        toast.success('Student finance added successfully');
        queryClient.invalidateQueries({
          queryKey: [GET_STUDENT_FIANCES_QUERY_KEY],
        });
      },
    },
  });

  const putStudentFinancesMutation = usePutStudentFinancesIdMutation({
    options: {
      onSuccess: () => {
        toast.success('Student finance updated successfully');
        queryClient.invalidateQueries({
          queryKey: [GET_STUDENT_FIANCES_QUERY_KEY],
        });
      },
    },
  });

  const onSubmit = (data: StudentFinancesSchema) => {
    const payload = {
      studentId: +data.studentId,
      academicYearId: +data.academicYearId,
      contractId: +data.contractId,
      paymentPlanId: +data.paymentPlanId,
      studentJoinedDate: format(data.studentJoinedDate, 'yyyy-MM-dd'),
    };

    defaultData
      ? putStudentFinancesMutation.mutate({
          id: defaultData.id,
          data: {
            ...payload,
          },
        })
      : postStudentFinancesMutation.mutate({
          data: {
            ...payload,
          },
        });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="studentId"
          render={() => (
            <FormItem>
              <FormLabel>Student</FormLabel>
              <StudentCombobox form={form} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentPlanId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Plan</FormLabel>
              <PaymentPlanSelect field={field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="academicYearId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Academic Year</FormLabel>
              <AcademicYearSelect field={field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contractId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contract Id</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Contract Id" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentJoinedDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Joined Date</FormLabel>
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
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type="submit"
            disabled={postStudentFinancesMutation.isPending}
            isLoading={postStudentFinancesMutation.isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
