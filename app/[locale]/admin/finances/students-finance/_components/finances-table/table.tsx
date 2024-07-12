'use client';

import Link from 'next/link';

import Loading from '@/app/[locale]/loading';
import { buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import R from '@/lib/config/routes';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { cn } from '@/lib/utils';
import { useGetStudentFinancesQuery } from '@/utils/api';

import { TableToolbar } from './table-tooltip';

export const FinancesTable = () => {
  const studentFinance = useGetStudentFinancesQuery();

  if (studentFinance.isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (!studentFinance.isSuccess) throw new DefaultError();

  const data = studentFinance.data.data;

  return (
    <div className="w-full space-y-4">
      <TableToolbar />
      <div className="overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Contract Id</TableHead>
              <TableHead>Student Status</TableHead>
              <TableHead>Contract Status</TableHead>
              <TableHead>Payment Plan</TableHead>
              <TableHead>Academic Year</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    {row.student.name + ' ' + row.student.surname}
                  </TableCell>
                  <TableCell>{row.student.phoneNumber}</TableCell>
                  <TableCell>{row.contractId}</TableCell>
                  <TableCell>{row.student.status}</TableCell>
                  <TableCell>{row.contractStatus}</TableCell>
                  <TableCell>{row.paymentPlan.name}</TableCell>
                  <TableCell>{row.academicYear.academicYearCode}</TableCell>
                  <TableCell>
                    <Link
                      href={R.ADMIN_STUDENT_FINANCE(row.id)}
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'sm' })
                      )}
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
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
