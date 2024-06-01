'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { IAttendanceOverview } from '@/types/attendance.interface';

import { AttBarChart } from './att-bar-chart';
import { AttPieChart } from './att-pie-chart';

interface CardAttendanceOverviewProps {
  courseName: string;
  data: IAttendanceOverview;
}

export const CardAttOverview: React.FC<CardAttendanceOverviewProps> = ({
  courseName,
  data,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{courseName} Attendance</CardTitle>
      </CardHeader>
      <CardContent className="gird-cols-1 grid gap-4 sm:grid-cols-[auto_1fr] xl:grid-cols-[auto_1fr]">
        <AttPieChart data={data} />
        <AttBarChart data={data} />
      </CardContent>
    </Card>
  );
};
