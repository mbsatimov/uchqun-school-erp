import { format } from 'date-fns';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { phoneFormat } from '@/lib/helpers';
import { numberFormat } from '@/lib/utils';

type Props = {
  studentFinance: StudentFinance;
};

export const StudentFinanceInfo = ({ studentFinance }: Props) => {
  return (
    <div className="space-y-2">
      <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="text-lg">
              {studentFinance.student.name +
                ' ' +
                studentFinance.student.surname}
            </CardTitle>
            <CardDescription className="group flex items-center gap-2">
              {phoneFormat(studentFinance.student.phoneNumber)}
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => {
                  window.navigator.clipboard.writeText(
                    studentFinance.student.phoneNumber
                  );
                  toast.info('Phone number copied to clipboard');
                }}
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy Order ID</span>
              </Button>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col p-6 text-sm lg:flex-row">
          <div className="flex-1 space-y-3">
            <div className="font-semibold">Payment Details</div>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Name</span>
                <span>
                  <Badge>{studentFinance.paymentPlan.name}</Badge>
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span>
                  {numberFormat(studentFinance.paymentPlan.price, {
                    style: 'currency',
                  })}
                </span>
              </li>
            </ul>
          </div>
          <Separator className="my-4 lg:mx-4 lg:my-0 lg:h-auto lg:w-[1px]" />
          <div className="flex-1 space-y-3">
            <div className="font-semibold">Parent</div>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Name</span>
                <span>Steve Jobs</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Phone</span>
                <button
                  onClick={() => {
                    window.navigator.clipboard.writeText('+998233223456');
                    toast.info('Phone number copied to clipboard');
                  }}
                >
                  {phoneFormat('+998233223456')}
                </button>
              </li>
            </ul>
          </div>
          <Separator className="my-4 lg:mx-4 lg:my-0 lg:h-auto lg:w-[1px]" />
          <div className="flex-1 space-y-3">
            <div className="font-semibold">Contract Information</div>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Contract Id</span>
                <span>{studentFinance.contractId}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <span>
                  <Badge>{studentFinance.contractStatus}</Badge>
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            {format(studentFinance.academicYear.startDate, 'dd MMM, yyyy')} -{' '}
            {format(studentFinance.academicYear.endDate, 'dd MMM, yyyy')}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
