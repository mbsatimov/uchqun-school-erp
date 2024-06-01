import { addDays, format } from 'date-fns';
import type { FC } from 'react';
import { useMemo } from 'react';

import { getStartOfWeek } from '@/lib/helpers';

interface ICalendarHeaderProps {
  currentDate: Date;
}

export const CalendarHeader: FC<ICalendarHeaderProps> = ({ currentDate }) => {
  const startOfWeek = useMemo(() => getStartOfWeek(currentDate), [currentDate]);

  return (
    <div className="flex justify-between">
      {Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i)).map(day => (
        <div
          key={day.getDate()}
          className="flex-1 border border-border p-2 text-center font-bold"
        >
          {format(day, 'EEE')}
        </div>
      ))}
    </div>
  );
};
