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
import { useGetPaymentPlansQuery } from '@/utils/api';

type Props = {
  field: ControllerRenderProps<StudentFinancesSchema, 'paymentPlanId'>;
};

export const PaymentPlanSelect: FC<Props> = ({ field }) => {
  const paymentPlans = useGetPaymentPlansQuery();

  return (
    <Select onValueChange={field.onChange} value={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select academic year" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {paymentPlans.isLoading ? (
          <div>Loading...</div>
        ) : (
          paymentPlans.data?.data.map(paymentPlan => (
            <SelectItem key={paymentPlan.id} value={String(paymentPlan.id)}>
              {paymentPlan.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};
