'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { useGetAcademicYearsQuery } from '@/utils/api';

import { AcademicYearItem } from './academic-year-item';

export const AcademicYearList = () => {
  const academicYears = useGetAcademicYearsQuery();

  if (academicYears.isError) throw new DefaultError();

  if (academicYears.data?.data.length === 0)
    return <p className="mt-10 text-center text-lg">No academic year found.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {academicYears.isLoading ? (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[130px] rounded-lg" />
          ))}
        </>
      ) : (
        academicYears.data?.data.map(academicYear => (
          <AcademicYearItem key={academicYear.id} academicYear={academicYear} />
        ))
      )}
    </div>
  );
};
