import { addDays, addMonths, format } from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import type { FC } from 'react';
import React, { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getStartOfWeek } from '@/lib/helpers';
import { cn } from '@/lib/utils';
interface ICalendarControlProps {
  viewMode: 'month' | 'week';
  setViewMode: React.Dispatch<React.SetStateAction<'month' | 'week'>>;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const CalendarControl: FC<ICalendarControlProps> = ({
  viewMode,
  setViewMode,
  currentDate,
  setCurrentDate,
}) => {
  const startOfWeek = useMemo(() => getStartOfWeek(currentDate), [currentDate]);

  const prevWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, -7));
  };

  const nextWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, 7));
  };

  const prevMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, -1));
  };

  const nextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };

  return (
    <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:flex-nowrap sm:justify-between">
      <div className="order-2 flex w-[180px] justify-between rounded-md bg-background/50 p-1 sm:order-1">
        <Button
          onClick={viewMode === 'month' ? prevMonth : prevWeek}
          variant={'ghost'}
          className={cn('h-8 flex-1')}
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={viewMode === 'month' ? nextMonth : nextWeek}
          variant={'ghost'}
          className={cn('h-8 flex-1')}
        >
          <ChevronRight />
        </Button>
      </div>

      <Popover>
        <PopoverTrigger asChild className="order-1 sm:order-2">
          <Button variant={'secondary'} className={cn('w-[280px] font-normal')}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {viewMode === 'month'
              ? `${format(currentDate, 'MMMM yyyy')}`
              : `${format(startOfWeek, 'MMM d')} - ${format(addDays(startOfWeek, 6), 'MMM d, yyyy')}`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
          <div className="flex gap-2">
            <Select
              defaultValue={(currentDate.getMonth() + 1).toString()}
              onValueChange={value =>
                setCurrentDate(
                  prevDate =>
                    new Date(
                      prevDate.getFullYear(),
                      parseInt(value) - 1,
                      prevDate.getDate()
                    )
                )
              }
              value={(currentDate.getMonth() + 1).toString()}
            >
              <SelectTrigger id="month" aria-label="Month">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i} value={(i + 1).toString()}>
                    {new Date(2022, i, 1).toLocaleString('default', {
                      month: 'long',
                    })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              defaultValue={currentDate.getFullYear().toString()}
              onValueChange={value =>
                setCurrentDate(
                  prevDate =>
                    new Date(
                      parseInt(value),
                      prevDate.getMonth(),
                      prevDate.getDate()
                    )
                )
              }
              value={currentDate.getFullYear().toString()}
            >
              <SelectTrigger id="year" aria-label="Year">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 20 }, (_, i) => (
                  <SelectItem key={i} value={`${2022 + i}`}>
                    {2022 + i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border">
            <Calendar
              mode="single"
              ISOWeek
              selected={currentDate}
              onSelect={date => setCurrentDate(date || new Date())}
              disableNavigation
              month={currentDate}
            />
          </div>
        </PopoverContent>
      </Popover>

      <Select
        defaultValue={viewMode}
        onValueChange={value => setViewMode(value as typeof viewMode)}
      >
        <SelectTrigger className="order-3 w-[180px]">
          <SelectValue placeholder="Select View" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="week">Weekly View</SelectItem>
            <SelectItem value="month">Monthly View</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
