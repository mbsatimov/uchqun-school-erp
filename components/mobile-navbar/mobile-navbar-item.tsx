'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import { cn } from '@/lib/utils';
import { INavItem } from '@/types/nav';

export type TMobileNavbarItem = INavItem;

export const MobileNavbarItem: FC<TMobileNavbarItem> = ({
  title,
  href,
  icon: Icon,
}) => {
  const t = useTranslations();
  const pathname = usePathname();
  return (
    <Link
      key={title}
      href={href}
      className={cn(
        'flex flex-1 flex-col items-center gap-1 text-muted-foreground',
        {
          'text-foreground': pathname.startsWith(href),
        }
      )}
    >
      {Icon}
      <span className="w-full truncate text-center text-xs">{t(title)}</span>
    </Link>
  );
};
