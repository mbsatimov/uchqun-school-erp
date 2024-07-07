'use client';

import { usePathname } from 'next/navigation';

import { LinkTabs, LinkTabsTrigger } from '@/components/ui/link-tabs';
import R from '@/lib/config/routes';

const tabs = [
  {
    label: 'Students finance',
    href: R.ADMIN_STUDENTS_FINANCE,
  },
  {
    label: 'Payment plans',
    href: R.ADMIN_PAYMENT_PLANS,
  },
  {
    label: 'Payments history',
    href: R.ADMIN_PAYMENTS_HISTORY,
  },
];

export const Navbar = () => {
  const pathname = usePathname();

  if (!tabs.some(tab => tab.href === pathname)) {
    return null;
  }

  return (
    <LinkTabs className="sticky top-20 z-40 mx-auto mb-6 flex-wrap shadow-md">
      {tabs.map(tab => (
        <LinkTabsTrigger key={tab.label} href={tab.href}>
          {tab.label}
        </LinkTabsTrigger>
      ))}
    </LinkTabs>
  );
};
