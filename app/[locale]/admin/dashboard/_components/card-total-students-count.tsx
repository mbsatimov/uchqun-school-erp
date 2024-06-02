'use client';

import { Users } from 'lucide-react';

import { useGetTotalStudentsCount } from '@/app/[locale]/admin/dashboard/_hooks/use-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DefaultError } from '@/lib/exceptions/default-exception';

export const CardTotalStudentsCount = () => {
  const totalStudentsCount = useGetTotalStudentsCount();

  if (totalStudentsCount.isError) throw new DefaultError();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Total students count
        </CardTitle>
        <Users />
      </CardHeader>
      <CardContent className="space-y-1.5">
        {totalStudentsCount.isLoading ? (
          <>
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-32" />
          </>
        ) : (
          <div className="text-2xl font-bold">{totalStudentsCount.data}</div>
        )}
      </CardContent>
    </Card>
  );
};
