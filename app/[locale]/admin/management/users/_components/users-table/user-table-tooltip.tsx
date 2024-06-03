import type { Row, Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDeleteSomeUsers } from '@/hooks/use-user';
import { cn } from '@/lib/utils';

import { DataTableFacetedFilter } from './user-table-faceted-filter';
import { UserTableViewOptions } from './user-table-view-option';

export const roles: Array<{
  value: Role;
  label: string;
}> = [
  {
    value: 'ADMIN',
    label: 'Admin',
  },
  {
    value: 'STUDENT',
    label: 'Student',
  },
  {
    value: 'TEACHER',
    label: 'Teacher',
  },
];

interface UserTableToolbarProps {
  table: Table<User>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export function UserTableToolbar({
  table,
  inputValue,
  setInputValue,
}: UserTableToolbarProps) {
  const deleteSomeUsers = useDeleteSomeUsers();
  const isFiltered = table.getState().columnFilters.length > 0;

  const handleDeleteSelectedData = () => {
    const data = table.getSelectedRowModel().rows.map((row: Row<User>) => ({
      id: row.original.id,
      role: row.original.role,
    }));
    deleteSomeUsers.mutate(data);
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center justify-between space-x-2">
        <Input
          placeholder="Filter users..."
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          className="h-8 w-auto sm:w-[220px]"
        />
        {table.getColumn('role') && (
          <DataTableFacetedFilter
            column={table.getColumn('role')}
            title="Role"
            options={roles}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDeleteSelectedData}
          className={cn('invisible mr-2 opacity-0 transition-all', {
            'visible opacity-100':
              table.getIsSomeRowsSelected() || table.getIsAllRowsSelected(),
          })}
        >
          Delete
        </Button>
        <UserTableViewOptions table={table} />
      </div>
    </div>
  );
}
