import { LangSwitcher } from '@/components/lang-switcher';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ThemeCustomizer } from '@/components/theme-customizer';

export default function Settings() {
  return (
    <MaxWidthWrapper>
      <ThemeCustomizer />
      <LangSwitcher />
    </MaxWidthWrapper>
  );
}
