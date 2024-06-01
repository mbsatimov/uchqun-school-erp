import type { FC } from 'react';

import { cn } from '@/lib/utils';

import type { TMobileNavbarItem } from './mobile-navbar-item';
import { MobileNavbarItem } from './mobile-navbar-item';

interface MobileNavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  bottomNavbarItems: Array<TMobileNavbarItem>;
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
