'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

interface LinkTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const LinkTabs = React.forwardRef<HTMLDivElement, LinkTabsProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex w-fit items-center justify-between rounded-md bg-muted/50 p-1 text-muted-foreground backdrop-blur-md sm:justify-center',
        className
      )}
      {...props}
    />
  )
);

LinkTabs.displayName = 'LinkTabs';

interface ITab extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const LinkTabsTrigger = React.forwardRef<HTMLAnchorElement, ITab>(
  ({ className, children, href }, ref) => {
    const pathname = usePathname();
    return (
      <Link
        ref={ref}
        key={href}
        href={href}
        className={cn(
          'rounded-sm px-3 py-1.5 text-center text-sm font-medium',
          {
            'bg-background text-foreground': pathname === href,
          },
          className
        )}
      >
        {children}
      </Link>
    );
  }
);

LinkTabsTrigger.displayName = 'LinkTabsTrigger';

export { LinkTabs, LinkTabsTrigger };
