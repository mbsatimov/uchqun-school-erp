'use client';

import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';

import Loading from '@/app/[locale]/loading';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import R from '@/lib/config/routes';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { cn } from '@/lib/utils';
import { useGetStudentFinancesIdQuery } from '@/utils/api';

import { CloseContractAlertDialog } from './_components/close-contract-alert-dialog';
import { MonthlyPaymentsCards } from './_components/monthly-payments-cards';
import { PaymentForm } from './_components/payment-form';
import { StudentFianceHistoryTable } from './_components/student-finance-history-table';

const StudentFiancePage = ({ params }: { params: { id: string } }) => {
  const getStudentFinancesId = useGetStudentFinancesIdQuery({
    request: { id: Number(params.id) },
  });

  if (getStudentFinancesId.isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (!getStudentFinancesId.isSuccess) throw new DefaultError();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href={R.ADMIN_STUDENTS_FINANCE}
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
          >
            <ArrowLeft size={24} />
          </Link>
          <h2 className="text-2xl font-semibold tracking-tight">Back</h2>
        </div>
        <div>
          <CloseContractAlertDialog
            studentFinanceId={Number(params.id)}
            contractStatus={getStudentFinancesId.data.data.contractStatus}
          />
        </div>
      </div>
      <div className="mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-1" size={20} />
              Add payment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-full overflow-y-auto sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Add payment</DialogTitle>
            </DialogHeader>
            <PaymentForm studentFinanceId={Number(params.id)} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-2">
        <MonthlyPaymentsCards />
      </div>
      <div className="mt-8 space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">
          Payment History
        </h2>
        <StudentFianceHistoryTable />
      </div>
    </div>
  );
};

export default StudentFiancePage;
