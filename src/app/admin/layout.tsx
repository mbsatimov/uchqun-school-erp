import { BarChartBig, Settings, ShieldCheck } from 'lucide-react';
import React from 'react';

import { GlobalSearch } from '@/components/global-search';
import { Header } from '@/components/header/header';
import MobileNavbar from '@/components/mobile-navbar/mobile-navbar';
import Sidebar from '@/components/sidebar/sidebar';
import R from '@/lib/config/routes';

const BAR_ITEMS = [
  {
    title: 'Dashboard',
    href: R.ADMIN_DASHBOARD,
    icon: <BarChartBig className="h-4 w-4" />,
  },
  {
    title: 'Management',
    href: R.ADMIN_MANAGEMENT,
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    title: 'Settings',
    href: R.ADMIN_SETTINGS,
    icon: <Settings className="h-4 w-4" />,
  },
];

const PROFILE_ITEM = {
  title: 'Profile',
  href: R.ADMIN_PROFILE,
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <Sidebar sidebarItems={BAR_ITEMS} />
      <div className="relative flex flex-1 flex-col overflow-y-auto">
        <Header headerItems={BAR_ITEMS} profileItem={PROFILE_ITEM}>
          <GlobalSearch />
        </Header>
        <div className="flex-1 py-4 md:py-6">{children}</div>
      </div>
      <MobileNavbar bottomNavbarItems={BAR_ITEMS} />
    </div>
  );
}

export default Layout;
