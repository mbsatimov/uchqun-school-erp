'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { attendanceStatusColorsMap } from '@/lib/constants/attendanceStatusColorMap';
import { phoneFormat } from '@/lib/helpers';

import { data } from './data';
import { TableToolbar } from './table-tooltip';

export const StudentsTable = () => {
  return (
    <div className="w-full space-y-4">
      <TableToolbar />
      <div className="overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name + ' ' + row.surname}</TableCell>
                  <TableCell>{phoneFormat(row.phoneNumber)}</TableCell>
                  <TableCell>
                    <Badge className={attendanceStatusColorsMap[row.status]}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.grade}</TableCell>
                  <TableCell className="flex justify-center">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
