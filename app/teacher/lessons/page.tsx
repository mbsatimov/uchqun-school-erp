import { format } from 'date-fns';
import type { Metadata } from 'next';

import MaxWidthWrapper from '@/components/max-width-wrapper';

import { LessonList } from './components/teacher-lesson-list';

export const metadata: Metadata = {
  title: 'Lessons',
  description: 'Teacher Today’s lessons',
};

export default function Lessons() {
  return (
    <MaxWidthWrapper>
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl">Today’s lessons</h2>
          <div>{format(new Date(), 'dd MMM yyyy')}</div>
        </div>
        <LessonList />
      </div>
    </MaxWidthWrapper>
  );
}
