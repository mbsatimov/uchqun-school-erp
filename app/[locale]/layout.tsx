import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';

import { CustomToaster } from '@/components/custom-toaster';
import Providers from '@/components/providers';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { cn } from '@/lib/utils';

import '@/styles/globals.css';
import '@/styles/themes.css';

const inter = Inter({
  display: 'fallback',
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Attendance App',
  description: '',
  icons: {
    icon: '/assets/logo-compact.png',
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn('h-screen', inter.className)}>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
        <ThemeSwitcher />
        <CustomToaster />
      </body>
    </html>
  );
}
