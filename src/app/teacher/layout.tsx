import { BookA, CalendarCheck, Edit, Settings } from 'lucide-react';
import React from 'react';

import { Header } from '@/components/header/header';
import MobileNavbar from '@/components/mobile-navbar/mobile-navbar';
import Sidebar from '@/components/sidebar/sidebar';
import ROUTES from '@/lib/config/routes';

const BAR_ITEMS = [
  {
    title: 'Lessons',
    href: ROUTES.TEACHER_LESSONS,
    icon: <BookA className="h-4 w-4" />,
  },
  {
    title: 'Schedule',
    href: ROUTES.TEACHER_SCHEDULE,
    icon: <CalendarCheck className="h-4 w-4" />,
  },
  {
    title: 'Management',
    href: ROUTES.TEACHER_MANAGEMENT,
    icon: <Edit className="h-4 w-4" />,
  },
  {
    title: 'Settings',
    href: ROUTES.TEACHER_SETTINGS,
    icon: <Settings className="h-4 w-4" />,
  },
];

const PROFILE_ITEM = {
  title: 'Profile',
  href: ROUTES.TEACHER_PROFILE,
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <Sidebar sidebarItems={BAR_ITEMS} />
      <div className="relative flex flex-1 flex-col overflow-y-auto">
        <Header headerItems={BAR_ITEMS} profileItem={PROFILE_ITEM} />
        <div className="flex-1 py-4 md:py-6">{children}</div>
      </div>
      <MobileNavbar bottomNavbarItems={BAR_ITEMS} />
    </div>
  );
}

export default Layout;
