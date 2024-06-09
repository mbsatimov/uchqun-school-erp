'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import { buttonVariants } from '@/components/ui';
import { cn } from '@/lib/utils';
import { INavItem } from '@/types/nav';

type TSidebarItem = INavItem;

export const SidebarItem: FC<TSidebarItem> = ({ title, href, icon: Icon }) => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'w-full justify-start space-x-2',
        {
          'bg-secondary hover:bg-secondary/80': pathname.startsWith(href),
        }
      )}
    >
      {Icon}
      <span className="w-full truncate">{t(title)}</span>
    </Link>
  );
};
