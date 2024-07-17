import { format } from 'date-fns';

import Loading from '@/app/[locale]/loading';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { cn } from '@/lib/utils';
import { useGetMonthlyPaymentsIdQuery } from '@/utils/api';

type Props = {
  id: number | string;
};

export const MonthlyPaymentsCards = ({ id }: Props) => {
  const getMonthlyPaymentsId = useGetMonthlyPaymentsIdQuery({
    request: { id },
  });

  if (getMonthlyPaymentsId.isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (!getMonthlyPaymentsId.isSuccess) throw new DefaultError();

  const data = getMonthlyPaymentsId.data.data;
  return (
    <Card className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4 p-2">
      {data
        .sort(
          (a, b) =>
            new Date(a.paymentMonth).getTime() -
            new Date(b.paymentMonth).getTime()
        )
        .map(item => (
          <Card key={item.id}>
            <CardHeader className="flex-row items-center justify-between p-2">
              <CardTitle>{format(item.paymentMonth, 'MMMM yyyy')}</CardTitle>
              <Badge
                className={cn(
                  'text-nowrap text-sm',
                  item.isCompleted ? 'bg-green-500' : 'bg-yellow-500'
                )}
              >
                {item.isCompleted ? 'Completed' : 'In debt'}
              </Badge>
            </CardHeader>
            <CardContent className="flex items-center justify-between px-2 pb-2">
              <p>{item.amount}som</p>
            </CardContent>
          </Card>
        ))}
    </Card>
  );
};
