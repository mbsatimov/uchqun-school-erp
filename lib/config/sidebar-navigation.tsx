import { BarChartBig, Settings, ShieldCheck } from 'lucide-react';

import R from '@/lib/config/routes';
import { INavItem } from '@/types/nav';

export const sidebarNavigation: Record<string, Array<INavItem>> = {
  admin: [
    {
      title: 'sidebar.links.dashboard',
      href: R.ADMIN_DASHBOARD,
      icon: <BarChartBig />,
    },
    {
      title: 'sidebar.links.management',
      href: R.ADMIN_MANAGEMENT,
      icon: <BarChartBig />,
    },
    {
      title: 'sidebar.links.settings',
      href: R.ADMIN_SETTINGS,
      icon: <Settings />,
    },
  ],
  teacher: [
    {
      title: 'sidebar.links.lessons',
      href: R.TEACHER_LESSONS,
      icon: <BarChartBig />,
    },
    {
      title: 'sidebar.links.schedule',
      href: R.TEACHER_SCHEDULE,
      icon: <ShieldCheck />,
    },
    {
      title: 'sidebar.links.management',
      href: R.TEACHER_MANAGEMENT,
      icon: <Settings />,
    },
    {
      title: 'sidebar.links.settings',
      href: R.TEACHER_SETTINGS,
      icon: <Settings />,
    },
  ],
  student: [
    {
      title: 'sidebar.links.lessons',
      href: R.TEACHER_LESSONS,
      icon: <BarChartBig />,
    },
    {
      title: 'sidebar.links.schedule',
      href: R.STUDENT_SCHEDULE,
      icon: <ShieldCheck />,
    },
    {
      title: 'sidebar.links.settings',
      href: R.TEACHER_SETTINGS,
      icon: <Settings />,
    },
  ],
};
