import type { Metadata } from 'next';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ThemeCustomizerItem } from '@/components/settings';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Teacher settings.',
};

export default function Settings() {
  return (
    <MaxWidthWrapper>
      <ThemeCustomizerItem />
    </MaxWidthWrapper>
  );
}
