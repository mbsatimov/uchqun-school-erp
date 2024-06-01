'use client';
import { usePathname } from 'next/navigation';

import R from '@/lib/config/routes';
import { LinkTabs, LinkTabsTrigger } from '@/components/ui/link-tabs';

export const GroupTabs = () => {
  const pathname = usePathname();
  const groupId = pathname.split('/')[4];

  const tabs_data = [
    {
      label: 'Groups',
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
