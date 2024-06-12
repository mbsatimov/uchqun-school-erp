import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { useURLSearchParams } from '@/hooks/use-url-search-params';
import { cn } from '@/lib/utils';

export const TableCalendar = () => {
  const { getParam, setParam, deleteParam } = useURLSearchParams();

  const selectedDate = getParam('date');

  const onDateChange = (date: Date | undefined) => {
    if (date) {
      setParam('date', format(date, 'yyyy-MM-dd'));
    } else deleteParam('date');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          size="sm"
          className={cn('justify-start text-left font-normal')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, 'PPP')
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          ISOWeek
          selected={selectedDate ? new Date(selectedDate) : undefined}
          onSelect={onDateChange}
        />
      </PopoverContent>
    </Popover>
  );
};
