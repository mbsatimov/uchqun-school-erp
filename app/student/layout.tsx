import {
  BarChartBig,
  CalendarCheck,
  CheckSquare2,
  Settings,
} from 'lucide-react';
import React from 'react';

import R from '@/lib/config/routes';
import { Header } from '@/components/header/header';
import MobileNavbar from '@/components/mobile-navbar/mobile-navbar';
import Sidebar from '@/components/sidebar/sidebar';

const BAR_ITEMS = [
  {
    title: 'Lessons',
    href: R.STUDENT_LESSONS,
    icon: <BarChartBig className="h-4 w-4" />,
  },
  {
    title: 'Schedule',
    href: R.STUDENT_SCHEDULE,
    icon: <CalendarCheck className="h-4 w-4" />,
  },
  {
    title: 'Quizzes',
    href: R.STUDENT_QUIZZES,
    icon: <CheckSquare2 className="h-4 w-4" />,
  },
  {
    title: 'Settings',
    href: R.STUDENT_SETTINGS,
    icon: <Settings className="h-4 w-4" />,
  },
];

const PROFILE_ITEM = {
  title: 'Profile',
  href: R.STUDENT_PROFILE,
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
