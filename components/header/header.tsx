'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ModeToggle } from '@/components/mode-toggle';
import { INavItem } from '@/types/nav';

import { HeaderMenu } from './header-menu';

interface HeaderProps {
  headerItems: Array<INavItem>;
  profileItem: INavItem;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  headerItems,
  profileItem,
  children,
}) => {
  const t = useTranslations();
  const pathname = usePathname();

  const headerTitle = [...headerItems, profileItem].find(item =>
    pathname.startsWith(item.href)
  )?.title;
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/30 backdrop-blur">
      <MaxWidthWrapper className="flex justify-between h-14 items-center">
        <h1 className="mr-2 truncate text-2xl font-bold">
          {t(headerTitle)}
        </h1>
        <div className="flex flex-shrink-0 items-center justify-end space-x-2">
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
