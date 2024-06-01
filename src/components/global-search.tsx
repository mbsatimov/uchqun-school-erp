'use client';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { HiOutlineUserGroup } from 'react-icons/hi2';

import { useGetAllAdmins } from '@/hooks/use-admin';
import { useGetAllCourses } from '@/hooks/use-course';
import { useGetAllGroups } from '@/hooks/use-group';
import { useGetAllGlobalSemesters } from '@/hooks/use-semester';
import { useGetAllStudents } from '@/hooks/use-student';
import { useGetAllTeachers } from '@/hooks/use-teacher';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { cn } from '@/lib/utils';

import { Button } from './ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import { Skeleton } from './ui/skeleton';

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative hidden w-full justify-start text-sm text-muted-foreground sm:block md:w-52 md:pr-12'
        )}
        onClick={() => setOpen(true)}
      >
        <span>Search anything...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1/2 hidden h-5 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Button
        variant="ghost"
        size={'icon'}
        onClick={() => setOpen(true)}
        className="sm:hidden"
      >
        <Search size={20} />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <GlobalSearchMenu setOpen={setOpen} />
      </CommandDialog>
    </>
  );
}

interface GlobalSearchMenuProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalSearchMenu: React.FC<GlobalSearchMenuProps> = ({
  setOpen,
}) => {
  const router = useRouter();

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  const students = useGetAllStudents();
  const teachers = useGetAllTeachers();
  const admins = useGetAllAdmins();
  const groups = useGetAllGroups();
  const courses = useGetAllCourses();
  const semesters = useGetAllGlobalSemesters();

  if (
    students.isError ||
    teachers.isError ||
    admins.isError ||
    groups.isError ||
    courses.isError ||
    semesters.isError
  ) {
    throw new DefaultError();
  }

  return (
    <>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {generateCommandItems(
          groups.data,
          'Groups',
          ['name'],
          '/admin/management/groups'
        )}
        {generateCommandItems(
          admins.data,
          'Admin',
          ['name', 'surname'],
          '/admin/management/admins'
        )}
        {generateCommandItems(
          teachers.data,
          'Teachers',
          ['name', 'surname'],
          '/admin/management/teachers'
        )}
        {generateCommandItems(
          students.data,
          'Students',
          ['name', 'surname'],
          '/admin/management/students'
        )}
        {generateCommandItems(
          courses.data,
          'Courses',
          ['name'],
          '/admin/management/courses'
        )}
        {generateCommandItems(
          semesters.data,
          'Semesters',
          ['portion', 'startDate', 'endDate'],
          '/admin/management/semesters'
        )}
        {students.isLoading ||
        teachers.isLoading ||
        groups.isLoading ||
        courses.isLoading ||
        semesters.isLoading ||
        admins.isLoading ? (
          <div className="space-y-4 p-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <CommandItem key={i}>
                <Skeleton className="h-4 w-[60%]" />
              </CommandItem>
            ))}
          </div>
        ) : null}
        <CommandSeparator />
      </CommandList>
    </>
  );

  function generateCommandItems<T extends { id: number }>(
    items: Array<T> | undefined,
    heading: string,
    label: Array<keyof T>,
    linkPath: string
  ) {
    if (!items || items.length === 0) return null;

    return (
      <CommandGroup heading={heading}>
        {items.map(item => (
          <CommandItem
            key={item.id}
            value={Object.values(item).join(' ')}
            onSelect={() => {
              runCommand(() => router.push(`${linkPath}/${item.id}`));
            }}
          >
            <div className="mr-2 flex h-5 w-5 items-center justify-center">
              <HiOutlineUserGroup className="h-3 w-3" />
            </div>
            {label.map(key => item[key]).join(' ')}
          </CommandItem>
        ))}
      </CommandGroup>
    );
  }
};
