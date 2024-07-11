import { FC } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { StudentFinancesSchema } from '@/app/[locale]/admin/finances/students-finance/_components/student-finance-form/utils/validation-schema';
import { FormControl } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetAcademicYearsQuery } from '@/utils/api';

type Props = {
  field: ControllerRenderProps<StudentFinancesSchema, 'academicYearId'>;
};

export const AcademicYearSelect: FC<Props> = ({ field }) => {
  const academicYears = useGetAcademicYearsQuery();

  return (
    <Select onValueChange={field.onChange} value={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select academic year" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {academicYears.isLoading ? (
          <div>Loading...</div>
        ) : (
          academicYears.data?.data.map(academicYear => (
            <SelectItem key={academicYear.id} value={String(academicYear.id)}>
              {academicYear.academicYearCode}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};
