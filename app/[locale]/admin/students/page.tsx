'use client';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { useSearch } from '@/hooks/use-search';

import { columns } from './_components/students-table/columns';
import { data } from './_components/students-table/data';
import { StudentsTable } from './_components/students-table/table';

function StudentsDashboardPage() {
  const { filteredData, inputValue, setInputValue } = useSearch({
    data,
    searchBy: ['name', 'surname', 'phoneNumber'],
  });

  return (
    <MaxWidthWrapper>
      <div>
        <StudentsTable
          data={filteredData}
          columns={columns}
          searchValue={inputValue}
          setSearchValue={setInputValue}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default StudentsDashboardPage;
