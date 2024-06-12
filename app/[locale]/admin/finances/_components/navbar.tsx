'use client';

import { usePathname } from 'next/navigation';

import { LinkTabs, LinkTabsTrigger } from '@/components/ui/link-tabs';
import R from '@/lib/config/routes';

const tabs_data = [
  {
    label: 'Finance',
    href: R.ADMIN_GROUPS,
  },
  {
    label: 'Monthly payments',
    href: R.ADMIN_MONTHLY_PAYMENTS,
  },
  {
    label: 'Payment history',
    href: R.ADMIN_PAYMENT_HISTORY,
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
