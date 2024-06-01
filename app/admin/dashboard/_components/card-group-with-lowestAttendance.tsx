'use client';

import { TrendingDown } from 'lucide-react';

import { DefaultError } from '@/lib/exceptions/default-exception';
import { useGetGroupWithLowestAttendance } from '@/app/admin/dashboard/_hooks/use-dashboard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const CardGroupWithLowestAttendance = () => {
  const groupWithLowestAttendance = useGetGroupWithLowestAttendance();

  if (groupWithLowestAttendance.isError) throw new DefaultError();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Group with lowest attendance
        </CardTitle>
        <TrendingDown />
      </CardHeader>
      <CardContent className="space-y-1.5">
        {groupWithLowestAttendance.isLoading ? (
          <>
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-32" />
          </>
        ) : !groupWithLowestAttendance.data ? (
          <p className="text-sm text-muted-foreground">
            No group with lowest attendance
          </p>
        ) : (
          <>
            <div className="text-2xl font-bold">
              {groupWithLowestAttendance.data?.group?.name}
            </div>
            <CardDescription>
              {groupWithLowestAttendance.data?.percentage}% for this semester.
            </CardDescription>
          </>
        )}
      </CardContent>
    </Card>
  );
};
