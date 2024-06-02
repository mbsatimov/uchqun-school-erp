import type { FC } from 'react';

import { cn } from '@/lib/utils';
import { INavItem } from '@/types/nav';

import { MobileNavbarItem } from './mobile-navbar-item';

interface MobileNavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  bottomNavbarItems: Array<INavItem>;
}

const MobileNavbar: FC<MobileNavbarProps> = ({
  className,
  bottomNavbarItems,
}) => {
  return (
    <div
      className={cn(
        'flex h-14 items-center gap-2 border-t border-border bg-background/30 md:hidden',
        className
      )}
    >
      {bottomNavbarItems.map(item => (
        <MobileNavbarItem key={item.title} {...item} />
      ))}
    </div>
  );
};

export default MobileNavbar;
