import type { Metadata } from 'next';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { UserProfileDetails } from '@/components/user-profile/user-profile-details';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Admin profile.',
};

export default function AdminProfilePage() {
  return (
    <MaxWidthWrapper>
      <UserProfileDetails />
    </MaxWidthWrapper>
  );
}
