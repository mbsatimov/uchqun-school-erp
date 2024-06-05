import MaxWidthWrapper from '@/components/max-width-wrapper';
import { LangSwitcherItem, ThemeCustomizerItem } from '@/components/settings';

export default function Settings() {
  return (
    <MaxWidthWrapper>
      <div className="mx-auto max-w-2xl space-y-10">
        <ThemeCustomizerItem />
        <LangSwitcherItem />
      </div>
    </MaxWidthWrapper>
  );
}
