'use client';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { useSearch } from '@/hooks/use-search';

import { columns } from './students-history/columns';
import { StudentsHistoryTable } from './students-history/table';

const data: Array<StudentAttendance> = [
  {
    id: 1,
    name: 'John',
    surname: 'Doe',
    phoneNumber: '+998901234567',
    grade: 10,
    comment: 'This is a comment',
    status: 'PRESENT',
    date: '2022-01-01',
    absentId: 1,
    absentStatus: 'CHECKED',
    absentComment: null,
  },
  {
    id: 2,
    name: 'Henry',
    surname: 'Evans',
    phoneNumber: '+998901234567',
    grade: 10,
    comment: 'This is a comment',
    status: 'LATE',
    date: '2022-01-01',
    absentId: 2,
    absentStatus: 'UNCHECKED',
    absentComment: null,
  },
];

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
