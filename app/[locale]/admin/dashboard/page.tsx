import type { Metadata } from 'next';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Calendar } from '@/components/ui/calendar';

import { CardGroupWithHighestAttendance } from './_components/card-group-with-highest-attendance';
import { CardGroupWithLowestAttendance } from './_components/card-group-with-lowestAttendance';
import { CardStudentAttendance } from './_components/card-student-attendance';
import { CardStudentHistory } from './_components/card-students-history';
import { CardTodayAttendanceCount } from './_components/card-today-attendance-count';
import { CardTotalStudentsCount } from './_components/card-total-students-count';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Admin dashboard.',
};

export default function DashboardPage() {
  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CardTotalStudentsCount />
        <CardTodayAttendanceCount />
        <CardGroupWithHighestAttendance />
        <CardGroupWithLowestAttendance />
        <div className="col-span-full flex flex-col items-start gap-4 lg:flex-row lg:items-stretch">
          <CardStudentAttendance />
          <Calendar
            mode="single"
            ISOWeek
            className="rounded-md border bg-card/30 lg:col-span-4"
          />
        </div>
        <div className="col-span-full">
          <CardStudentHistory />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
