'use client';

import { Loader2 } from 'lucide-react';
import React from 'react';

import { useGetGroupById } from '@/hooks/use-group';
import { useSearch } from '@/hooks/use-search';
import { DefaultError } from '@/lib/exceptions/default-exception';

import { GroupStudentsTable } from './group-students-table/group-students-table';

interface GroupStudentsProps {
  groupId: number;
}

export const GroupStudents: React.FC<GroupStudentsProps> = ({ groupId }) => {
  const group = useGetGroupById(groupId);

  const students = group.data?.students || [];

  const { filteredData, inputValue, setInputValue } = useSearch({
    data: students || [],
    searchBy: ['name', 'surname', 'email', 'phoneNumber'],
  });

  if (group.isLoading)
    return (
      <div className="flex items-center justify-center pt-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );

  if (group.isError) throw new DefaultError();

  return (
    <GroupStudentsTable
      data={filteredData}
      searchValue={inputValue}
      setSearchValue={setInputValue}
    />
  );
};
