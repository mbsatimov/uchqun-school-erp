import { FC } from 'react';

import { Card, CardContent, CardTitle } from '@/components/ui/card';

type Props = {
  data: PaymentPlan;
};

export const PaymentPlanItem: FC<Props> = ({ data }) => {
  return (
    <Card>
      <CardContent className="space-y-2 p-4">
        <CardTitle>{data.name}</CardTitle>
        <p>{data.price}som</p>
      </CardContent>
    </Card>
  );
};
