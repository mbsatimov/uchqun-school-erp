import type { Pathnames } from 'next-intl/navigation';

export const defaultLocale = 'ru' as const;

export const locales = ['en', 'ru'] as const;

export const pathnames = {} satisfies Pathnames<typeof locales>;

export const localePrefix = 'never';
