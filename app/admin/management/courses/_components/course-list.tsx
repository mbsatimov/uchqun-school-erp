'use client';

import { useGetAllCourses } from '@/hooks/use-course';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { Skeleton } from '@/components/ui/skeleton';

import { CourseItem } from './course-item';

export const CoursesList = () => {
  const courses = useGetAllCourses();

  if (courses.isError) throw new DefaultError();

  if (courses.data?.length === 0)
    return <p className="mt-10 text-center text-lg">No courses found.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {courses.isLoading ? (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-[50px]" />
          ))}
        </>
      ) : (
        courses.data?.map(course => (
          <CourseItem key={course.id} course={course} />
        ))
      )}
    </div>
  );
};
