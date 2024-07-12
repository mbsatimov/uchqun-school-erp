'use client';

import { usePathname } from 'next/navigation';

import { LinkTabs, LinkTabsTrigger } from '@/components/ui/link-tabs';
import R from '@/lib/config/routes';

export const GroupTabs = () => {
  const pathname = usePathname();
  const groupId = pathname.split('/')[4];

  const tabs_data = [
    {
      label: 'Students',
      href: R.ADMIN_GROUP(groupId),
    },
    {
      label: 'Timetable',
      href: R.ADMIN_GROUP_TIMETABLE(groupId),
    },
  ];

  return (
    <LinkTabs className="mx-auto mb-4">
      {tabs_data.map(tab => (
        <LinkTabsTrigger key={tab.label} href={tab.href}>
          {tab.label}
        </LinkTabsTrigger>
      ))}
    </LinkTabs>
  );
};
