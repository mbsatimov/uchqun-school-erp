import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { locales } from './i18n/config';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  return {
    messages: (
      await (locale === 'en'
        ? // When using Turbopack, this will enable HMR for `en`
          import('./i18n/locales/en.json')
        : import(`./i18n/locales/${locale}.json`))
    ).default,
  };
});
