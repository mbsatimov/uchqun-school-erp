'use client';
import { usePathname } from 'next/navigation';

import R from '@/lib/config/routes';
import { LinkTabs, LinkTabsTrigger } from '@/components/ui/link-tabs';

const tabs_data = [
  {
    label: 'Homeworks',
    href: R.TEACHER_HOMEWORKS,
  },
  {
    label: 'Online',
    href: R.TEACHER_ONLINE_LESSONS,
  },
  {
    label: 'Quizzes',
    href: R.TEACHER_QUIZZES,
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
