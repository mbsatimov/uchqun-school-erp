'use client';

import { columns } from './_components/finances-table/columns';
import { data } from './_components/finances-table/data';
import { FinancesTable } from './_components/finances-table/table';

const FinancesPage = () => {
  return <FinancesTable data={data} columns={columns} />;
};

export default FinancesPage;
