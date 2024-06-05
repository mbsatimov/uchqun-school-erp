'use client';

import type { Table } from '@tanstack/react-table';

import { useRemoveSomeStudentsFromGroup } from '@/hooks/use-student';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { GroupStudentsTableViewOptions } from './group-students-table-view-option';

interface GroupStudentsTableToolbarProps {
  groupId: number;
  table: Table<IStudentWithGroupPreview>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export function GroupStudentsTableToolbar({
  groupId,
  table,
  inputValue,
  setInputValue,
}: GroupStudentsTableToolbarProps) {
  const deleteSomeStudents = useRemoveSomeStudentsFromGroup(groupId);

  const handleDeleteSelectedData = () => {
    const data = table.getSelectedRowModel().rows.map(row => row.original.id);
    deleteSomeStudents.mutate(data);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by (name, surname, phone, etc)..."
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          className="h-8 w-auto sm:w-[220px]"
        />
      </div>
      <AlertDialog>
        <AlertDialogTrigger
          className={cn(
            buttonVariants({ variant: 'destructive', size: 'sm' }),
            'invisible mr-2 opacity-0 transition-all',
            {
              'visible opacity-100':
                table.getIsSomeRowsSelected() || table.getIsAllRowsSelected(),
            }
          )}
        >
          Remove from group
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove selected students from this group, but not from
              global students list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSelectedData}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <GroupStudentsTableViewOptions table={table} />
    </div>
  );
}
