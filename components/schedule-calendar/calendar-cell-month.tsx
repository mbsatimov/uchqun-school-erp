'use client';
import { format, isSameMonth } from 'date-fns';
import type { FC } from 'react';
import { useMemo } from 'react';

import { getWeeks } from '@/lib/helpers';
import { cn } from '@/lib/utils';

import { CalendarCell } from './calendar-cell';

interface CalendarCellMonthProps extends React.HTMLAttributes<HTMLDivElement> {
  currentDate: Date;
  dailySchedules: Array<DailySchedule>;
  editable: boolean;
  onLessonClick?: (lesson: LessonPreview) => void;
}

export const CalendarCellMonth: FC<CalendarCellMonthProps> = ({
  currentDate,
  dailySchedules,
  editable,
  onLessonClick,
}) => {
  const weeks = useMemo(() => getWeeks(currentDate), [currentDate]);

  return weeks.map((week, index) => (
    <div className="grid min-h-[100px] grid-cols-7" key={index}>
      {week.map((day, idx) => (
        <div
          className={cn('group border border-border px-2 py-1', {
            'bg-card/30': !isSameMonth(day, currentDate),
          })}
          key={idx}
        >
          {dailySchedules
            .filter(
              schedule => schedule.courseDate === format(day, 'yyyy-MM-dd')
            )
            .map(dailySchedule => (
              <CalendarCell
                key={dailySchedule.id}
                editable={editable}
                day={day}
                dailySchedule={dailySchedule}
                onLessonClick={onLessonClick}
              />
            ))}
        </div>
      ))}
    </div>
  ));
};
