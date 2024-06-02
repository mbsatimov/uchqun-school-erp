'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import type { FC } from 'react';
import React from 'react';

import { cn } from '@/lib/utils';
import { INavItem } from '@/types/nav';

import { SidebarItem } from './sidebar-item';

interface SidebarProps {
  sidebarItems: Array<INavItem>;
}

const Sidebar: FC<SidebarProps> = ({ sidebarItems }) => {
  const { resolvedTheme: theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, [theme]);

  return (
    <aside
      className={cn(
        'hidden w-60 border-r border-border bg-background/30 backdrop-blur md:block'
      )}
    >
      <div className="space-y-4 py-2">
        <div className="px-3">
          <div className="mb-4 flex items-center gap-2 font-semibold">
            {mounted && theme === 'dark' ? (
              <Image
                src="/assets/logo-compact.png"
                alt="logo"
                width={500}
                height={500}
                className="h-12 w-auto"
                priority={true}
              />
            ) : (
              <Image
                src="/assets/logo-compact-dark.png"
                alt="logo"
                width={500}
                height={500}
                className="h-12 w-auto"
                priority={true}
              />
            )}
            <div className="text-xl font-semibold">MyClass</div>
          </div>
          <div className="space-y-2">
            {sidebarItems.map(item => (
              <SidebarItem key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
