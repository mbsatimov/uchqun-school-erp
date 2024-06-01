import { format } from 'date-fns';
import type { Metadata } from 'next';

import MaxWidthWrapper from '@/components/max-width-wrapper';

import { StudentLessonList } from './components/student-lesson-list';

export const metadata: Metadata = {
  title: 'Lessons',
  description: 'Student Today’s lessons',
};

export default function Lessons() {
  return (
    <MaxWidthWrapper>
      <div className="mx-auto flex max-w-2xl flex-col justify-center gap-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl">Today’s lessons</h2>
          <div className="text-lg">{format(new Date(), 'dd MMM yyyy')}</div>
        </div>
        <StudentLessonList />
      </div>
    </MaxWidthWrapper>
  );
}
