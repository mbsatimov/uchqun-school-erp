'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import React from 'react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type TSidebarItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

export const SidebarItem: FC<TSidebarItem> = ({ title, href, icon: Icon }) => {
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
      <span>{title}</span>
    </Link>
  );
};
