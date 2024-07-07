import { ListFilter } from 'lucide-react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { useURLSearchParams } from '@/hooks/use-url-search-params';

export function TableFilterMobile() {
  const { clearParams } = useURLSearchParams();

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
            {/* <DataTableFacetedFilter
              column={table.getColumn('status')}
              filterKey="status"
              options={statuses}
              title="Status"
            /> */}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={clearParams}>Clear</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
