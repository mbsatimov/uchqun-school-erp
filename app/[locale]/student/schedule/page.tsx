import type { Metadata } from 'next';

import MaxWidthWrapper from '@/components/max-width-wrapper';

import { StudentScheduleCalendar } from './student-schedule-calendar';

export const metadata: Metadata = {
  title: 'Schedule',
  description: 'Student schedule.',
};

export default function Schedule() {
  return (
    <MaxWidthWrapper>
      <StudentScheduleCalendar />
    </MaxWidthWrapper>
  );
}
