'use client';

import Link from 'next/link';

import { useGetAllGroups } from '@/hooks/use-group';
import R from '@/lib/config/routes';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const GroupList = () => {
  const groups = useGetAllGroups();

  if (groups.isError) throw new DefaultError();

  if (groups.data?.length === 0)
    return <p className="mt-10 text-center text-lg">No groups found.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {groups.isLoading ? (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-[130px] rounded-lg" />
          ))}
        </>
      ) : (
        groups.data?.map(group => (
          <Link key={group.id} href={R.ADMIN_GROUP(group.id)}>
            <Card key={group.id} className="hover:bg-accent/50">
              <CardHeader>
                <CardTitle className="truncate text-xl">{group.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Number of students: {group.numberOfStudents}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};
