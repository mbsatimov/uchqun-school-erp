'use client';

import { useGetAllGlobalSemesters } from '@/hooks/use-semester';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { Skeleton } from '@/components/ui/skeleton';

import { SemesterItem } from './semester-item';

export const SemesterList = () => {
  const semesters = useGetAllGlobalSemesters();

  if (semesters.isError) throw new DefaultError();

  if (semesters.data?.length === 0)
    return <p className="mt-10 text-center text-lg">No semester found.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {semesters.isLoading ? (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[130px] rounded-lg" />
          ))}
        </>
      ) : (
        semesters.data?.map(semester => (
          <SemesterItem key={semester.id} semester={semester} />
        ))
      )}
    </div>
  );
};
