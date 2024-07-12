'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import Loading from '@/app/[locale]/loading';
import { buttonVariants } from '@/components/ui/button';
import R from '@/lib/config/routes';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { cn } from '@/lib/utils';
import { useGetStudentFinancesIdQuery } from '@/utils/api';

import { CloseContractAlertDialog } from './_components/close-contract-alert-dialog';
import { MonthlyPaymentsCards } from './_components/monthly-payments-cards';
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
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">
          Monthly Payments
        </h2>
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
