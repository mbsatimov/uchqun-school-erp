import type { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui';

import { TableCalendar } from './table-calendar';
import { TableFilterMobile } from './table-filter-mobile';
import { StudentAttendanceTableViewOptions } from './table-view-option';

interface StudentAttendanceTableToolbarProps<TData> {
  table: Table<TData>;
}

export function TableToolbar<TData>({ table }: StudentAttendanceTableToolbarProps<TData>) {
  return (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center justify-between space-x-2">
        <Input
          placeholder="Filter users..."
          // value={inputValue}
          // onChange={event => setInputValue(event.target.value)}
          className="h-8 w-auto flex-1 sm:w-[220px]"
        />
        <div className="lg:hidden">
          <TableFilterMobile table={table} />
        </div>
        <div className="hidden lg:block">
          {/* {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              filterKey="status"
              title="Status"
              options={statuses}
            />
          )} */}
        </div>
        <div className="hidden lg:block">
          {table.getColumn('date') && <TableCalendar />}
        </div>
      </div>
      <div className="flex items-center">
        <StudentAttendanceTableViewOptions table={table} />
      </div>
    </div>
  );
}
