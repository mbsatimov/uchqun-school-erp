import type { Metadata } from 'next';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { UserProfileDetails } from '@/components/user-profile/user-profile-details';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Teacher profile',
};

export default function TeacherProfilePage() {
  return (
    <MaxWidthWrapper>
      <UserProfileDetails />
    </MaxWidthWrapper>
  );
}
