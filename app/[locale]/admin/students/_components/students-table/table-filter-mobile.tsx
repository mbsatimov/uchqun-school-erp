import { ListFilter } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { statuses } from './data';
import { TableCalendar } from './table-calendar';
import { DataTableFacetedFilter } from './table-filter';

export const TableFilterMobile = () => {
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
