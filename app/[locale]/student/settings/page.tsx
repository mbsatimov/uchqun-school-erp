import type { Metadata } from 'next';

import { LangSwitcher } from '@/components/lang-switcher';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ThemeCustomizer } from '@/components/theme-customizer';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Student settings.',
};

export default function Settings() {
  return (
    <MaxWidthWrapper>
      <ThemeCustomizer />
      <LangSwitcher />
    </MaxWidthWrapper>
  );
}
