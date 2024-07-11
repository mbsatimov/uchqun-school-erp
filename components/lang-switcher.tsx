'use client';

import Cookies from 'js-cookie';
import { useLocale } from 'next-intl';
import type { FC } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { localeMap, locales } from '@/i18n/config';

export const LangSwitcher: FC = () => {
  const locale = useLocale();

  const onLocaleChange = (locale: (typeof locales)[number]) => {
    Cookies.set('NEXT_LOCALE', locale);
    window.location.reload();
  };

  return (
    <Select value={locale} onValueChange={onLocaleChange}>
      <SelectTrigger className="w-[200px]">
        {localeMap[locale as (typeof locales)[number]]}
      </SelectTrigger>
      <SelectContent>
        {locales.map(locale => (
          <SelectItem key={locale} value={locale}>
            {localeMap[locale]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
