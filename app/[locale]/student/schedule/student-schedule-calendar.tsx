'use client';

import { useEffect, useState } from 'react';

import Loading from '@/app/[locale]/loading';
import ScheduleCalendar from '@/components/schedule-calendar/schedule-calendar';
import { useGetStudentCurrentSemester } from '@/hooks/use-semester';
import { getCurrentUser } from '@/lib/auth.helper';
import { DefaultError } from '@/lib/exceptions/default-exception';

export const StudentScheduleCalendar = () => {
  const user = getCurrentUser();
  const currentSemester = useGetStudentCurrentSemester(user.id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Loading />;

  if (currentSemester.isLoading) return <Loading />;

  if (currentSemester.isError) throw new DefaultError();

  if (!currentSemester.data) {
    return <div>You do not have schedule yet.</div>;
  }

  return (
    <div>
      <ScheduleCalendar
        dailySchedules={currentSemester.data.dailySchedules}
        defaultViewMode="month"
      />
    </div>
  );
};
