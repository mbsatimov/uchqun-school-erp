'use client';
import { usePathname } from 'next/navigation';


import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ModeToggle } from '@/components/mode-toggle';

import { HeaderMenu } from './header-menu';

type THeaderItem = {
  title: string;
  href: string;
  icon?: React.ReactNode;
};
interface HeaderProps {
  headerItems: Array<THeaderItem>;
  profileItem: THeaderItem;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  headerItems,
  profileItem,
  children,
}) => {
  const pathname = usePathname();

  const headerTitle = [...headerItems, profileItem].find(item =>
    pathname.startsWith(item.href)
  )?.title;
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/30 backdrop-blur">
      <MaxWidthWrapper className="flex h-14 items-center">
        <h1 className="mr-2 text-2xl font-bold">{headerTitle}</h1>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {children}
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <HeaderMenu profileLink={profileItem.href} />
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
