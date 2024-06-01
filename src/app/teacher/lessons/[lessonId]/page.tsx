'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import Loading from '@/app/loading';
import { StudentList } from '@/app/teacher/lessons/components/student-list';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { buttonVariants } from '@/components/ui/button';
import { useGetLessonById } from '@/hooks/use-lesson';
import R from '@/lib/config/routes';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { cn } from '@/lib/utils';

function GroupAttendancePage({
  params: { lessonId },
}: {
  params: { lessonId: number };
}) {
  const lesson = useGetLessonById(lessonId);

  if (lesson.isLoading) return <Loading />;

  if (!lesson.data) throw new DefaultError();

  return (
    <MaxWidthWrapper>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link
            href={R.TEACHER_LESSONS}
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
          >
            <ArrowLeft size={24} />
          </Link>
          <h2 className="text-2xl font-bold md:text-3xl">
            {lesson.data.course.name}
          </h2>
        </div>
        <StudentList
          lessonId={lessonId}
          attendances={lesson.data.attendances}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default GroupAttendancePage;
