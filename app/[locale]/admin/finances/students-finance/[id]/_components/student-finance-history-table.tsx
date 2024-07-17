'use client';

import { format } from 'date-fns';
import { MessageCircleMore } from 'lucide-react';

import Loading from '@/app/[locale]/loading';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { numberFormat } from '@/lib/utils';
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
              <TableHead>Amount (UZS)</TableHead>
              <TableHead className="text-center">Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell className="text-nowrap">
                    {format(row.date, 'dd MMM, yyyy')}
                  </TableCell>
                  <TableCell>{row.addedBy}</TableCell>
                  <TableCell>{row.payedFrom}</TableCell>
                  <TableCell>{numberFormat(row.amount)}</TableCell>
                  <TableCell className="flex justify-center">
                    {row.comment ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon-sm" variant={'outline'}>
                            <MessageCircleMore />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Comment</AlertDialogTitle>
                            <AlertDialogDescription>
                              {row.comment}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Close</AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      '-'
                    )}
                  </TableCell>
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
