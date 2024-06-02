import React from 'react';

import { Header } from '@/components/header/header';
import MobileNavbar from '@/components/mobile-navbar/mobile-navbar';
import Sidebar from '@/components/sidebar/sidebar';
import { profileNavigationItem } from '@/lib/config/profile-navigation-item';
import { sidebarNavigation } from '@/lib/config/sidebar-navigation';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <Sidebar sidebarItems={sidebarNavigation.teacher} />
      <div className="relative flex flex-1 flex-col overflow-y-auto">
        <Header
          headerItems={sidebarNavigation.teacher}
          profileItem={profileNavigationItem.teacher}
        />
        <div className="flex-1 py-4 md:py-6">{children}</div>
      </div>
      <MobileNavbar bottomNavbarItems={sidebarNavigation.teacher} />
    </div>
  );
}

export default Layout;
