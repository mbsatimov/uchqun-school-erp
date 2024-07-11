'use client';

import { CommandList } from 'cmdk';
import { Check, ChevronsUpDown } from 'lucide-react';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { StudentFinancesSchema } from '@/app/[locale]/admin/finances/students-finance/_components/student-finance-form/utils/validation-schema';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { FormControl } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useSearch } from '@/hooks/use-search';
import { useGetAllStudents } from '@/hooks/use-student';
import { cn } from '@/lib/utils';

type Props = {
  form: UseFormReturn<StudentFinancesSchema>;
};

export const StudentCombobox: FC<Props> = ({ form }) => {
  const students = useGetAllStudents();
  const currentStudentId = form.watch('studentId');
  const currentStudent = students.data?.find(
    student => student.id === +currentStudentId
  );

  const { filteredData, inputValue, setInputValue } = useSearch({
    data: students.data || [],
    searchBy: ['name', 'surname', 'phoneNumber'],
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'w-full justify-between',
              !currentStudentId && 'text-muted-foreground'
            )}
          >
            {currentStudentId
              ? currentStudent?.name + ' ' + currentStudent?.surname
              : 'Select student'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput
            placeholder="Search language..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandEmpty>No student found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {filteredData?.map(student => (
                <CommandItem
                  value={String(student.id)}
                  key={student.id}
                  onSelect={() => {
                    form.setValue('studentId', String(student.id));
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      student.id === +currentStudentId
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {student.name + ' ' + student.surname}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
