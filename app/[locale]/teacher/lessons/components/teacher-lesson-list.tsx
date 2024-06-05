'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Badge, Card, Skeleton } from '@/components/ui';
import { useGetTeacherTodayLessons } from '@/hooks/use-lesson';
import { getCurrentUser } from '@/lib/auth.helper';
import R from '@/lib/config/routes';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { LessonStatusColorsMap } from '@/lib/helpers';
import { cn } from '@/lib/utils';

export const TeacherLessonList = () => {
  const user = getCurrentUser();
  const lessons = useGetTeacherTodayLessons(user.id);
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

  if (lessons.isError) throw new DefaultError();

  return (
    <>
      {lessons.data?.length === 0 ? (
        <p>Today no lessons</p>
      ) : (
        lessons.data?.map(lesson => (
          <Link key={lesson.id} href={R.TEACHER_LESSON(lesson.id)}>
            <Card className="relative hover:bg-accent/50">
              <Badge
                className={cn(
                  'absolute -top-2 left-2 bg-present capitalize',
                  LessonStatusColorsMap[lesson.lessonStatus]
                )}
              >
                {lesson.lessonStatus}
              </Badge>
              <div className="flex flex-col items-center gap-1 p-6 text-base sm:flex-row lg:text-lg">
                <div className="flex-1">{lesson.courseName}</div>
                <div className="text-sm text-muted-foreground lg:text-base">
                  {lesson.startTime.slice(0, -3)} -{' '}
                  {lesson.endTime.slice(0, -3)}
                </div>
                <div className="flex-1 text-end">{lesson.groupName}</div>
              </div>
            </Card>
          </Link>
        ))
      )}
    </>
  );
};
