import {
  BarChartBig,
  BookOpenCheck,
  CalendarCheck,
  CircleDollarSign,
  Settings2,
  ShieldCheck,
  Users,
} from 'lucide-react';

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
      title: 'sidebar.links.students',
      href: R.ADMIN_STUDENTS,
      icon: <Users />,
    },
    {
      title: 'sidebar.links.finances',
      href: R.ADMIN_FINANCES,
      icon: <CircleDollarSign />,
    },
    {
      title: 'sidebar.links.management',
      href: R.ADMIN_MANAGEMENT,
      icon: <ShieldCheck />,
    },
    {
      title: 'sidebar.links.settings',
      href: R.ADMIN_SETTINGS,
      icon: <Settings2 />,
    },
  ],
  teacher: [
    {
      title: 'sidebar.links.lessons',
      href: R.TEACHER_LESSONS,
      icon: <BookOpenCheck />,
    },
    {
      title: 'sidebar.links.schedule',
      href: R.TEACHER_SCHEDULE,
      icon: <CalendarCheck />,
    },
    {
      title: 'sidebar.links.management',
      href: R.TEACHER_MANAGEMENT,
      icon: <ShieldCheck />,
    },
    {
      title: 'sidebar.links.settings',
      href: R.TEACHER_SETTINGS,
      icon: <Settings2 />,
    },
  ],
  student: [
    {
      title: 'sidebar.links.lessons',
      href: R.STUDENT_LESSONS,
      icon: <BookOpenCheck />,
    },
    {
      title: 'sidebar.links.schedule',
      href: R.STUDENT_SCHEDULE,
      icon: <CalendarCheck />,
    },
    {
      title: 'sidebar.links.settings',
      href: R.STUDENT_SETTINGS,
      icon: <Settings2 />,
    },
  ],
};
