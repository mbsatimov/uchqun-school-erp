import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { CustomToaster } from '@/components/custom-toaster';
import Providers from '@/components/providers';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { cn } from '@/lib/utils';

import '@/styles/globals.css';
import '@/styles/themes.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Attendance App',
  description: '',
  icons: {
    icon: '/assets/logo-compact.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('h-screen', inter.className)}>
        <Providers>{children}</Providers>
        <ThemeSwitcher />
        <CustomToaster />
      </body>
    </html>
  );
}
