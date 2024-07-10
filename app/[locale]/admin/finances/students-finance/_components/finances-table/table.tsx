'use client';

import { Edit } from 'lucide-react';

import { StudentFinanceDialog } from '@/app/[locale]/admin/finances/students-finance/_components/student-finance-dialog';
import Loading from '@/app/[locale]/loading';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { DefaultError } from '@/lib/exceptions/default-exception';
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
                    <StudentFinanceDialog defaultData={row}>
                      <Button variant="outline" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </StudentFinanceDialog>
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
