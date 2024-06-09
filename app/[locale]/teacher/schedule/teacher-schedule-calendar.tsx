'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Loading from '@/app/[locale]/loading';
import { ScheduleCalendar } from '@/components/schedule-calendar';
import { useGetTeacherDailySchedules } from '@/hooks/use-daily-schedule';
import { getCurrentUser } from '@/lib/auth.helper';
import R from '@/lib/config/routes';
import { DefaultError } from '@/lib/exceptions/default-exception';

export const TeacherScheduleCalendar = () => {
  const user = getCurrentUser();
  const teacherCurrentSemester = useGetTeacherDailySchedules(user.id);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [limit, setLimit] = useState(40);

  console.log(startDate, limit);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Loading />;

  if (teacherCurrentSemester.isLoading) return <Loading />;

  if (!teacherCurrentSemester.isSuccess) throw new DefaultError();

  if (teacherCurrentSemester.data === null) {
    return <div>You do not have schedule yet.</div>;
  }

  return (
    <div>
      <ScheduleCalendar
        dailySchedules={teacherCurrentSemester.data}
        defaultViewMode="month"
        onLessonClick={lesson => router.push(R.TEACHER_LESSON(lesson.id))}
        setStartDate={setStartDate}
        setLimit={setLimit}
      />
    </div>
  );
};
