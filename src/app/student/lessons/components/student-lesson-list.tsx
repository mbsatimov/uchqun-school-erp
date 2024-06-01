'use client';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetStudentTodayLessonsStatistics } from '@/hooks/use-attendance';
import { getCurrentUser } from '@/lib/auth.helper';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { AttendanceStatusColorsMap } from '@/lib/helpers';
import { cn } from '@/lib/utils';

export const StudentLessonList = () => {
  const user = getCurrentUser();
  const lessons = useGetStudentTodayLessonsStatistics(user.id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || lessons.isLoading)
    return (
      <>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card
            key={i}
            className="flex h-[70px] items-center justify-between p-6 hover:bg-accent/50"
          >
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </Card>
        ))}
      </>
    );

  if (lessons.isSuccess && lessons.data?.length === 0)
    return (
      <p className="flex h-14 items-center justify-center text-2xl font-medium">
        Today no lessons
      </p>
    );

  if (!lessons.data || lessons.isError) throw new DefaultError();

  return (
    <>
      {lessons.data.length === 0 ? (
        <p>Today no lessons</p>
      ) : (
        lessons.data.map(lesson => (
          <Card key={lesson.id} className="relative">
            <Badge
              className={cn(
                'absolute -top-2 left-2 bg-present capitalize',
                AttendanceStatusColorsMap[lesson.status]
              )}
            >
              {lesson.status}
            </Badge>
            <div className="flex flex-col items-center gap-1 p-6 text-base sm:flex-row lg:text-lg">
              <div className="flex-1">{lesson.courseName}</div>
              <div className="text-sm text-muted-foreground lg:text-base">
                {lesson.startTime.slice(0, -3)} - {lesson.endTime.slice(0, -3)}
              </div>
              <div className="flex-1 text-end">{lesson.teacherName}</div>
            </div>
          </Card>
        ))
      )}
    </>
  );
};
