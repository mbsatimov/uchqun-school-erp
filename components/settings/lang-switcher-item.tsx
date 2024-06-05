import { useTranslations } from 'next-intl';

import { LangSwitcher } from '@/components/lang-switcher';

export const LangSwitcherItem = () => {
  const t = useTranslations('settings.language');

  return (
    <div className="space-y-2">
      <h2 className="mb-2 font-medium">{t('title')}</h2>
      <LangSwitcher />
      <p className="text-sm text-muted-foreground">{t('description')}</p>
    </div>
  );
};
