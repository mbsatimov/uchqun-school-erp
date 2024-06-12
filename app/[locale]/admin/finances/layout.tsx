import React from 'react';

import MaxWidthWrapper from '@/components/max-width-wrapper';

import { Navbar } from './_components/navbar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper>
      <Navbar />
      {children}
    </MaxWidthWrapper>
  );
}

export default Layout;
