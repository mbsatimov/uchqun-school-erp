'use client';

import MaxWidthWrapper from '@/components/max-width-wrapper';

import { FinancesTable } from './_components/finances-table/table';
import { data } from './_components/finances-table/data';
import { columns } from './_components/finances-table/columns';

const FinancesPage = () => {
  return (
    <MaxWidthWrapper>
      <FinancesTable data={data} columns={columns} />
    </MaxWidthWrapper>
  );
};

export default FinancesPage;
