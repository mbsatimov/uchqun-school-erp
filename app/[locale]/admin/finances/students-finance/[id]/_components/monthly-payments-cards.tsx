import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const data: Array<MonthlyPayment> = [
  {
    id: 1,
    amount: 1000,
    isCompleted: true,
    paymentMonth: '2024-07-11',
  },
  {
    id: 2,
    amount: 1000,
    isCompleted: false,
    paymentMonth: '2024-07-11',
  },
];

export const MonthlyPaymentsCards = () => {
  return (
    <Card className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 p-2">
      {data.map(item => (
        <Card key={item.id}>
          <CardHeader className="flex-row items-center justify-between p-2">
            <CardTitle>{format(item.paymentMonth, 'MMMM yyyy')}</CardTitle>
            <Badge
              className={cn(
                'text-sm',
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
