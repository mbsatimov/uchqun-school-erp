'use client';

import { usePathname } from 'next/navigation';

import { LinkTabs, LinkTabsTrigger } from '@/components/ui/link-tabs';
import R from '@/lib/config/routes';

const tabs_data = [
  {
    label: 'Homeworks',
    href: R.TEACHER_HOMEWORKS,
  },
  {
    label: 'Exams',
    href: R.TEACHER_EXAMS,
  },
];

const ManagementTabs = () => {
  const pathname = usePathname();

  if (!tabs_data.some(tab => tab.href === pathname)) {
    return null;
  }

  return (
    <LinkTabs className="mx-auto mb-6 flex-wrap">
      {tabs_data.map(tab => (
        <LinkTabsTrigger key={tab.label} href={tab.href}>
          {tab.label}
        </LinkTabsTrigger>
      ))}
    </LinkTabs>
  );
};

export default ManagementTabs;
