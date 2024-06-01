import React from 'react';

import MaxWidthWrapper from '@/components/max-width-wrapper';

import ManagementTabs from './_components/management-tabs';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper>
      <ManagementTabs />
      {children}
    </MaxWidthWrapper>
  );
}

export default Layout;
