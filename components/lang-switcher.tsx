'use client';

import Cookies from 'js-cookie';
import { useLocale } from 'next-intl';
import type { FC } from 'react';

import { locales } from '@/i18n/config';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui';

export const LangSwitcher: FC = () => {
  const locale = useLocale();

  const onLocaleChange = (locale: (typeof locales)[number]) => {
    Cookies.set('NEXT_LOCALE', locale);
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">{locale}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {locales.map(locale => (
          <DropdownMenuItem key={locale} onClick={() => onLocaleChange(locale)}>
            {locale}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
