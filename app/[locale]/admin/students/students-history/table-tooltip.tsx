import type { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui';

import { StudentAttendanceTableViewOptions } from './table-view-option';

interface StudentAttendanceTableToolbarProps {
  table: Table<StudentAttendance>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export function StudentAttendanceTableToolbar({
  table,
  inputValue,
  setInputValue,
}: StudentAttendanceTableToolbarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center justify-between space-x-2">
        <Input
          placeholder="Filter users..."
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          className="h-8 w-auto sm:w-[220px]"
        />
      </div>
      <div className="flex items-center">
        <StudentAttendanceTableViewOptions table={table} />
      </div>
    </div>
  );
}
