'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import React from 'react';

import { cn } from '@/lib/utils';

export type TMobileNavbarItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

export const MobileNavbarItem: FC<TMobileNavbarItem> = ({
  title,
  href,
  icon,
}) => {
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
      {icon}
      <span className="truncate text-xs">{title}</span>
    </Link>
  );
};
