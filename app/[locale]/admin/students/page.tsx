'use client';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { useSearch } from '@/hooks/use-search';

import { columns } from './students-history/columns';
import { StudentsHistoryTable } from './students-history/table';
import { data } from './data';

function StudentsDashboardPage() {
  const { filteredData, inputValue, setInputValue } = useSearch({
    data,
    searchBy: ['name', 'surname', 'phoneNumber'],
  });

  return (
    <MaxWidthWrapper>
      <div>
        <StudentsHistoryTable
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
