import { CommandList } from 'cmdk';
import { Check } from 'lucide-react';
import type { FC } from 'react';
import React from 'react';

import { Command, CommandEmpty, CommandItem } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearch } from '@/hooks/use-search';
import {
  useGetAllStudents,
  useGetAllStudentsByGroupId,
} from '@/hooks/use-student';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { cn } from '@/lib/utils';

interface StudentSelectionCommandMenuProps {
  selectedValues: Array<StudentPreview>;
  setSelectedValues: React.Dispatch<
    React.SetStateAction<Array<StudentPreview>>
  >;
  inputRef: React.RefObject<HTMLInputElement>;
  groupId: number;
}

export const StudentSelectionCommandMenu: FC<
  StudentSelectionCommandMenuProps
> = ({ selectedValues, setSelectedValues, inputRef, groupId }) => {
  const students = useGetAllStudents();
  const groupStudents = useGetAllStudentsByGroupId(groupId);

  // filter out students that are already in the group
  const data =
    students.data?.filter(
      student =>
        !groupStudents.data?.find(
          groupStudent => groupStudent.id === student.id
        )
    ) || [];

  const { filteredData, inputValue, setInputValue } = useSearch({
    data,
    searchBy: ['name', 'surname', 'phoneNumber'],
  });

  const toggleStudent = (student: StudentPreview) => {
    setSelectedValues(currentStudents =>
      !currentStudents.includes(student)
        ? [...currentStudents, student]
        : currentStudents.filter(s => s.id !== student.id)
    );
    inputRef?.current?.focus();
  };

  if (students.isError) throw new DefaultError();

  return (
    <Command>
      <input
        placeholder="Search students..."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className="flex h-11 w-full rounded-md bg-transparent p-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      />
      <ScrollArea className="h-[30vh]">
        <CommandList>
          {students.isLoading ? (
            <>
              {Array.from({ length: 10 }).map((_, idx) => (
                <CommandItem key={idx}>
                  <Skeleton className="ml-4 h-4 w-[80%]" />
                </CommandItem>
              ))}
            </>
          ) : (
            filteredData.map(student => {
              console.log(student);
              const isActive = selectedValues.includes(student);
              return (
                <CommandItem
                  key={student.id}
                  value={String(student.id)}
                  onSelect={() => toggleStudent(student)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      isActive ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <div
                    className={cn('flex-1', {
                      'text-yellow-500': student?.groupId,
                    })}
                  >
                    {student.name} {student.surname}
                  </div>
                  <div className="hidden text-muted-foreground sm:block">
                    {student.phoneNumber}
                  </div>
                </CommandItem>
              );
            })
          )}
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </ScrollArea>
    </Command>
  );
};
