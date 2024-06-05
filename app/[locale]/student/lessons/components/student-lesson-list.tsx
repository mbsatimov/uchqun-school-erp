'use client';
import { useEffect, useState } from 'react';
import { HiOutlineStar, HiStar } from 'react-icons/hi2';

import {
  Badge,
  Card,
  CardFooter,
  CardHeader,
  Separator,
  Skeleton,
} from '@/components/ui';
import { useGetStudentTodayLessonsStatistics } from '@/hooks/use-attendance';
import { getCurrentUser } from '@/lib/auth.helper';
import { gradeColorMap } from '@/lib/constants';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { AttendanceStatusColorsMap } from '@/lib/helpers';
import { cn } from '@/lib/utils';

import { CommentDialog } from './comment-dialog';

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
            <CardHeader className="flex-col items-center gap-1 text-base sm:flex-row lg:text-lg">
              <div className="flex-1">{lesson.courseName}</div>
              <div className="text-sm text-muted-foreground lg:text-base">
                {lesson.startTime.slice(0, -3)} - {lesson.endTime.slice(0, -3)}
              </div>
              <div className="flex-1 text-end">{lesson.teacherName}</div>
            </CardHeader>
            <Separator />
            <CardFooter className="mt-4 justify-between">
              {!!lesson.grade && (
                <div className="flex items-center justify-center gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i}>
                      {lesson.grade && lesson.grade > i && (
                        <HiStar
                          className={cn(
                            'size-7 text-primary',
                            gradeColorMap[lesson.grade]
                          )}
                        />
                      )}
                      {lesson.grade && lesson.grade <= i && (
                        <HiOutlineStar className="size-7 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              )}
              {lesson.comment && <CommentDialog comment={lesson.comment} />}
            </CardFooter>
          </Card>
        ))
      )}
    </>
  );
};
