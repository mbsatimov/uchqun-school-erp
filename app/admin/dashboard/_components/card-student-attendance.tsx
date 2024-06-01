'use client';

import { DefaultError } from '@/lib/exceptions/default-exception';
import { useGetOverallAttendance } from '@/app/admin/dashboard/_hooks/use-dashboard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { StudentAttendanceLineChart } from './student-attendance-line-chart';

export const CardStudentAttendance = () => {
  const overallAttendance = useGetOverallAttendance();

  if (overallAttendance.isError) throw new DefaultError();

  return (
    <Card className="w-full flex-1 lg:w-auto">
      <CardHeader>
        <CardTitle>Attendance</CardTitle>
        <CardDescription>
          Line chart shows the overall attendance of all students in lessons.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[250px] pb-3 pl-0">
        {overallAttendance.data ? (
          <StudentAttendanceLineChart data={overallAttendance.data} />
        ) : null}
      </CardContent>
    </Card>
  );
};
