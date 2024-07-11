'use client';

import { Edit } from 'lucide-react';
import React from 'react';

import { AcademicYearForm } from '@/app/[locale]/admin/management/academic-years/_components/academic-year-form';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AcademicYearItemProps {
  academicYear: AcademicYear;
}

export const AcademicYearItem: React.FC<AcademicYearItemProps> = ({
  academicYear,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="truncate text-xl">
          {academicYear.academicYearCode}
        </CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size={'icon'}>
              <Edit className="mr-1" size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-full overflow-y-auto sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Edit academic year</DialogTitle>
            </DialogHeader>
            <AcademicYearForm defaultData={academicYear} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="flex items-center justify-between space-y-1">
        <div className="text-sm text-muted-foreground">
          {academicYear.startDate} - {academicYear.endDate}
        </div>
      </CardContent>
    </Card>
  );
};
