'use client';

import { usePathname } from 'next/navigation';

import R from '@/lib/config/routes';
import { LinkTabs, LinkTabsTrigger } from '@/components/ui/link-tabs';

const tabs_data = [
  {
    label: 'Groups',
    href: R.ADMIN_GROUPS,
  },
  {
    label: 'Courses',
    href: R.ADMIN_COURSES,
  },
  {
    label: 'Semesters',
    href: R.ADMIN_SEMESTERS,
  },
  {
    label: 'Users',
    href: R.ADMIN_USERS,
  },
];

export const Navbar = () => {
  const pathname = usePathname();

  if (!tabs_data.some(tab => tab.href === pathname)) {
    return null;
  }

  return (
    <LinkTabs className="sticky top-20 z-40 mx-auto mb-6 flex-wrap shadow-md">
      {tabs_data.map(tab => (
        <LinkTabsTrigger key={tab.label} href={tab.href}>
          {tab.label}
        </LinkTabsTrigger>
      ))}
    </LinkTabs>
  );
};
