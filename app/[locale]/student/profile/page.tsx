import type { Metadata } from 'next';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Card } from '@/components/ui/card';
import { UserProfileDetails } from '@/components/user-profile/user-profile-details';

import { StudentAttendanceBlock } from './components/student-attendance-block';
import { StudentDetails } from './components/student-details';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Student profile.',
};

export default function StudentProfilePage() {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <Card className="space-y-4 p-6">
          <UserProfileDetails />
          <StudentDetails />
        </Card>
        <section className="flex-1">
          <StudentAttendanceBlock />
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
