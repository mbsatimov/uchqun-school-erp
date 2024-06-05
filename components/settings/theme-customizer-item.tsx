import { useTranslations } from 'next-intl';

import { ThemeCustomizer } from '@/components/theme-customizer';

export const ThemeCustomizerItem = () => {
  const t = useTranslations('settings.theme');

  return (
    <div className="space-y-2">
      <h2 className="mb-2 font-medium">{t('title')}</h2>
      <ThemeCustomizer />
      <p className="text-sm text-muted-foreground">{t('description')}</p>
    </div>
  );
};
