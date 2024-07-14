import { Input } from '@/components/ui/input';

import { statuses } from './data';
import { TableCalendar } from './table-calendar';
import { DataTableFacetedFilter } from './table-filter';
import { TableFilterMobile } from './table-filter-mobile';

export function TableToolbar() {
  return (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center justify-between space-x-2">
        <Input
          placeholder="Filter users..."
          className="h-8 w-auto flex-1 sm:w-[220px]"
        />
        <div className="lg:hidden">
          <TableFilterMobile />
        </div>
        <div className="hidden lg:block">
          <DataTableFacetedFilter
            filterKey="status"
            title="Status"
            options={statuses}
          />
        </div>
        <div className="hidden lg:block">
          <TableCalendar />
        </div>
      </div>
    </div>
  );
}
