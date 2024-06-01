// MonthGrid Component
import { format, isSameMonth } from 'date-fns';
import React, { useMemo } from 'react';

import { AttendanceStatusColorsMap, getWeeks } from '@/lib/helpers';
import { cn } from '@/lib/utils';

import type { IAttendanceRecord } from './heatmap.interface';

interface MonthGridProps {
  month: Date;
  data: IAttendanceRecord;
}

export const MonthGrid: React.FC<MonthGridProps> = ({ month, data }) => {
  const weeks = useMemo(() => getWeeks(new Date(month)), [month]);

  return (
    <div className="min-w-fit">
      <div className="grid grid-flow-col grid-rows-[repeat(7,1fr)] gap-1">
        {weeks.map(week =>
          week.map((day, idx) => {
            const date =
              isSameMonth(day, month) &&
              Object.keys(data).find(
                date => date === format(day, 'yyyy-MM-dd')
              );
            if (!date) {
              return (
                <div
                  key={idx}
                  className={cn(
                    'h-3 w-3 rounded-[3px]',
                    `${isSameMonth(day, month) ? AttendanceStatusColorsMap['UNKNOWN'] : ''}`
                  )}
                ></div>
              );
            }
            return (
              <div
                key={idx}
                className={cn(
                  'h-3 w-3 rounded-[4px]',
                  AttendanceStatusColorsMap[data[date][0].status]
                )}
              ></div>
            );
          })
        )}
      </div>
      <h4 className="text-center text-sm">{format(month, 'MMM')}</h4>
    </div>
  );
};
