'use client';

import { Skeleton } from '@/components/ui';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { useGetPaymentPlansQuery } from '@/utils/api/hooks/payment-plans';

import { PaymentPlanItem } from './payment-plan-item';

export const PaymentPlanList = () => {
  const paymentPlans = useGetPaymentPlansQuery();

  if (paymentPlans.isError) throw new DefaultError();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
      {paymentPlans.isLoading
        ? Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[130px] rounded-lg" />
          ))
        : paymentPlans.data?.data.map(item => (
            <PaymentPlanItem key={item.id} data={item} />
          ))}
    </div>
  );
};
