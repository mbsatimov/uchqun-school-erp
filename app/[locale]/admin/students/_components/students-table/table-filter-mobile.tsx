import { Table } from '@tanstack/react-table';
import { ListFilter } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';

import { statuses } from './data';
import { TableCalendar } from './table-calendar';
import { DataTableFacetedFilter } from './table-filter';

interface TableFilterMobileProps<TData> {
  table: Table<TData>;
}

export const TableFilterMobile: FC<TableFilterMobileProps<any>> = ({
  table,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const onClear = () => {
    router.replace(pathname);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'secondary'} size="sm">
          <ListFilter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p>Status</p>
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              filterKey="status"
              options={statuses}
              title="Status"
            />
          </div>
          <div className="flex items-center justify-between">
            <p>Date</p>
            <TableCalendar />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClear}>Clear</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
