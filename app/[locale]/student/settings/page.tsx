import type { Metadata } from 'next';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { LangSwitcherItem, ThemeCustomizerItem } from '@/components/settings';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Student settings.',
};

export default function Settings() {
  return (
    <MaxWidthWrapper>
      <div className="space-y-8">
        <ThemeCustomizerItem />
        <LangSwitcherItem />
      </div>
    </MaxWidthWrapper>
  );
}
