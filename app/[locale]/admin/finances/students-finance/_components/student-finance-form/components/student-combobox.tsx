'use client';

import { CommandList } from 'cmdk';
import { Check, ChevronsUpDown } from 'lucide-react';
import { FC, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { StudentFinancesSchema } from '@/app/[locale]/admin/finances/students-finance/_components/student-finance-form/utils/validation-schema';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { FormControl } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useGetAllStudents } from '@/hooks/use-student';
import { cn } from '@/lib/utils';

type Props = {
  form: UseFormReturn<StudentFinancesSchema>;
};

export const StudentCombobox: FC<Props> = ({ form }) => {
  const [open, setOpen] = useState(false);

  const students = useGetAllStudents();
  const currentStudentId = form.watch('studentId');
  const currentStudent = students.data?.find(
    student => student.id === +currentStudentId
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
          <CommandInput placeholder="Search language..." />
          <CommandEmpty>No student found.</CommandEmpty>
          <CommandList>
            {students.data?.map(student => (
              <CommandItem
                value={`${student.name} ${student.surname}`}
                key={student.id}
                onSelect={() => {
                  form.setValue('studentId', String(student.id));
                  setOpen(false);
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
        </Command>
      </PopoverContent>
    </Popover>
  );
};
