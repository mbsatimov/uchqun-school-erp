'use client';

import { PieChart } from 'lucide-react';

import { useGetTodayAttendanceCount } from '@/app/admin/dashboard/_hooks/use-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DefaultError } from '@/lib/exceptions/default-exception';

export const CardTodayAttendanceCount = () => {
  const todayAttendanceCount = useGetTodayAttendanceCount();

  if (todayAttendanceCount.isError) throw new DefaultError();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Today&apos;s Attendance count
        </CardTitle>
        <PieChart />
      </CardHeader>
      <CardContent className="space-y-1.5">
        {todayAttendanceCount.isLoading ? (
          <>
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-32" />
          </>
        ) : (
          <div className="text-2xl font-bold">{todayAttendanceCount.data}</div>
        )}
      </CardContent>
    </Card>
  );
};
