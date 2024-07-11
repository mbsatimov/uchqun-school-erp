'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { usePostStudentFinancesMutation } from '@/utils/api';

import { AcademicYearSelect } from './components/academic-year-select';
import { StudentCombobox } from './components/student-combobox';
import {
  StudentFinancesSchema,
  studentFinancesSchema,
} from './utils/validation-schema';

export const StudentFinanceForm = () => {
  const postStudentFinancesMutation = usePostStudentFinancesMutation();

  const form = useForm<StudentFinancesSchema>({
    resolver: zodResolver(studentFinancesSchema),
    mode: 'onTouched',
    defaultValues: {
      studentId: '',
      academicYearId: '',
      contractId: '',
      paymentPlanId: '',
      studentJoinedDate: new Date(),
    },
  });

  const onSubmit = (data: StudentFinancesSchema) => {
    postStudentFinancesMutation.mutate({
      data: {
        studentId: +data.studentId,
        academicYearId: +data.academicYearId,
        contractId: +data.contractId,
        paymentPlanId: +data.paymentPlanId,
        studentJoinedDate: format(data.studentJoinedDate, 'yyyy-MM-dd'),
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
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student</FormLabel>
              <AcademicYearSelect field={field} />
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
