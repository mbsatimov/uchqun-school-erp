'use client';

import { Plus } from 'lucide-react';

import Loading from '@/app/[locale]/loading';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { useGetStudentFinancesQuery } from '@/utils/api';

import { columns } from './_components/finances-table/columns';
import { FinancesTable } from './_components/finances-table/table';
import { StudentFinanceForm } from './_components/student-finance-form';

const FinancesPage = () => {
  const studentFinance = useGetStudentFinancesQuery();

  if (studentFinance.isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (!studentFinance.isSuccess) throw new DefaultError();

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="mr-1" size={20} />
            <span>Add student finance</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-full overflow-y-auto sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Add student finance</DialogTitle>
          </DialogHeader>
          <StudentFinanceForm />
        </DialogContent>
      </Dialog>
      <div className="mt-4">
        <FinancesTable data={studentFinance.data.data} columns={columns} />
      </div>
    </div>
  );
};

export default FinancesPage;
