'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui';

import { FinancesTable } from './_components/finances-table/table';
import { StudentFinanceDialog } from './_components/student-finance-dialog';

const FinancesPage = () => {
  return (
    <div>
      <StudentFinanceDialog>
        <Button variant="outline">
          <Plus className="mr-1" size={20} />
          <span>Add student finance</span>
        </Button>
      </StudentFinanceDialog>
      <div className="mt-4">
        <FinancesTable />
      </div>
    </div>
  );
};

export default FinancesPage;
