import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export const numberFormat = (
  value: number,
  {
    locale = 'uz-UZ',
    style = 'decimal',
    currency = 'UZS',
  }: {
    locale?: Intl.LocalesArgument;
    currency?: string;
    style?: keyof Intl.NumberFormatOptionsStyleRegistry;
  } = {}
) =>
  new Intl.NumberFormat(locale, {
    style: style,
    currency: currency,
  }).format(value);
