import type { Pathnames } from 'next-intl/navigation';

export const defaultLocale = 'uz' as const;

export const locales = ['en', 'ru', 'uz'] as const;

export const pathnames = {} satisfies Pathnames<typeof locales>;

export const localePrefix = 'never';

export const localeMap: Record<(typeof locales)[number], string> = {
  en: 'English',
  ru: 'Русский',
  uz: "O'zbek tili",
};
