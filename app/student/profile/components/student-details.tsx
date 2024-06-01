'use client';
import { useEffect, useState } from 'react';

import { useGetStudentById } from '@/hooks/use-student';
import { getCurrentUser } from '@/lib/auth.helper';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { Skeleton } from '@/components/ui/skeleton';

export const StudentDetails = () => {
  const student = useGetStudentById(getCurrentUser().id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || student.isLoading) {
    return (
      <>
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-32" />
      </>
    );
  }

  if (student.isError) throw new DefaultError();

  return (
    <ul className="mx-auto mt-4 max-w-[400px] space-y-4 text-sm">
      <li className="flex justify-between gap-2">
        <b>Phone: </b>
        <a
          className="hover:underline"
          href={`tel:${student.data?.phoneNumber}`}
        >
          {student.data?.phoneNumber}
        </a>
      </li>
      <li className="flex justify-between gap-2">
        <b>Email: </b>
        <span>{student.data?.email}</span>
      </li>
      <li className="flex justify-between gap-2">
        <b className="font-bold">Role: </b>
        <span>{student.data?.role}</span>
      </li>
      <li className="flex justify-between gap-2">
        <b className="font-bold">Group: </b>
        <span>{student.data?.group ? student.data.group.name : '--'}</span>
      </li>
    </ul>
  );
};
