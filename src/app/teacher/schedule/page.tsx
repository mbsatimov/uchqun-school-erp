import type { Metadata } from 'next';

import MaxWidthWrapper from '@/components/max-width-wrapper';

import { TeacherScheduleCalendar } from './teacher-schedule-calendar';

export const metadata: Metadata = {
  title: 'Schedule',
  description: 'Teacher schedule.',
};

export default function Schedule() {
  return (
    <MaxWidthWrapper>
      <TeacherScheduleCalendar />
    </MaxWidthWrapper>
  );
}
