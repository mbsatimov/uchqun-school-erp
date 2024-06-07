'use client';
import { addDays, format } from 'date-fns';
import type { FC } from 'react';
import { useMemo } from 'react';

import { getStartOfWeek } from '@/lib/helpers';

import { CalendarCell } from './calendar-cell';

interface CalendarCellProps extends React.HTMLAttributes<HTMLDivElement> {
  currentDate: Date;
  dailySchedules: Array<DailySchedule>;
  editable: boolean;
  onLessonClick?: (lesson: LessonPreview) => void;
}

export const CalendarCellWeek: FC<CalendarCellProps> = ({
  currentDate,
  dailySchedules,
  editable,
  onLessonClick,
}) => {
  const startOfWeek = useMemo(() => getStartOfWeek(currentDate), [currentDate]);

  return (
    <div className="grid min-h-[250px] grid-cols-7">
      {Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i)).map(
        (day, i) => (
          <div key={i} className="group flex-1 border border-border px-2 py-1">
            {dailySchedules.map((dailySchedule: DailySchedule) => {
              if (dailySchedule.courseDate === format(day, 'yyyy-MM-dd')) {
                return (
                  <CalendarCell
                    key={dailySchedule.id}
                    editable={editable}
                    day={day}
                    dailySchedule={dailySchedule}
                    onLessonClick={onLessonClick}
                  />
                );
              }
            })}
          </div>
        )
      )}
    </div>
  );
};
