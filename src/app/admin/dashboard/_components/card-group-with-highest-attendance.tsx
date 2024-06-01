'use client';

import { TrendingUp } from 'lucide-react';

import { useGetGroupWithHighestAttendance } from '@/app/admin/dashboard/_hooks/use-dashboard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DefaultError } from '@/lib/exceptions/default-exception';

export const CardGroupWithHighestAttendance = () => {
  const groupWithHighestAttendance = useGetGroupWithHighestAttendance();

  if (groupWithHighestAttendance.isError) throw new DefaultError();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Group with highest attendance
        </CardTitle>
        <TrendingUp />
      </CardHeader>
      <CardContent className="space-y-1.5">
        {groupWithHighestAttendance.isLoading ? (
          <>
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-32" />
          </>
        ) : !groupWithHighestAttendance.data ? (
          <p className="text-sm text-muted-foreground">
            No group with highest attendance
          </p>
        ) : (
          <>
            <div className="text-2xl font-bold">
              {groupWithHighestAttendance.data?.group?.name}
            </div>
            <CardDescription>
              {groupWithHighestAttendance.data?.percentage}% for this semester.
            </CardDescription>
          </>
        )}
      </CardContent>
    </Card>
  );
};
