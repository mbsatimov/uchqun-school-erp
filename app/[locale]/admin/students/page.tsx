'use client';

import MaxWidthWrapper from '@/components/max-width-wrapper';

import { StudentsTable } from './_components/students-table/table';

function StudentsDashboardPage() {
  return (
    <MaxWidthWrapper>
      <div>
        <StudentsTable />
      </div>
    </MaxWidthWrapper>
  );
}

export default StudentsDashboardPage;
