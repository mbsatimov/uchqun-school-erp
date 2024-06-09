'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

import { StudentsHistoryTable } from './students-history/table';

export const CardStudentHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Students History</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[400px]">
        <StudentsHistoryTable data={[]} />
      </CardContent>
    </Card>
  );
};
