'use client';

import { useState } from 'react';

import Loading from '@/app/[locale]/loading';
import { ScheduleCalendar } from '@/components/schedule-calendar';
import { useGetStudentCurrentSemester } from '@/hooks/use-semester';
import { DefaultError } from '@/lib/exceptions/default-exception';

export const StudentScheduleCalendar = () => {
  const currentSemester = useGetStudentCurrentSemester();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [limit, setLimit] = useState(40);

  console.log(startDate, limit);

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
        setStartDate={setStartDate}
        setLimit={setLimit}
      />
    </div>
  );
};
