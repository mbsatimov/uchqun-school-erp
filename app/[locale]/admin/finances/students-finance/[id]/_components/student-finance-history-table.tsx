'use client';

import Loading from '@/app/[locale]/loading';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { useGetPaymentHistoryIdQuery } from '@/utils/api';

type Props = {
  id: number | string;
};

export const StudentFianceHistoryTable = ({ id }: Props) => {
  const paymentHistory = useGetPaymentHistoryIdQuery({
    request: { id },
  });

  if (paymentHistory.isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (!paymentHistory.isSuccess) throw new DefaultError();

  const data = paymentHistory.data.data;

  return (
    <div className="w-full space-y-4">
      <div className="overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Added by</TableHead>
              <TableHead>Payed from</TableHead>
              <TableHead>Payment plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.addedBy}</TableCell>
                  <TableCell>{row.payedFrom}</TableCell>
                  <TableCell>{row.studentFinance.paymentPlan.name}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.studentFinance.contractStatus}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 w-full text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <DataTablePagination table={table} /> */}
    </div>
  );
};
