'use client';
import type { FC } from 'react';
import { useState } from 'react';

import { CalendarCellMonth } from './calendar-cell-month';
import { CalendarCellWeek } from './calendar-cell-week';
import { CalendarControl } from './calendar-control';
import { CalendarHeader } from './calendar-header';

interface ScheduleCalendarProps {
  defaultViewMode?: 'week' | 'month';
  dailySchedules: Array<DailySchedule>;
  editable?: boolean;
  onLessonClick?: (lesson: LessonPreview) => void;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export const ScheduleCalendar: FC<ScheduleCalendarProps> = ({
  defaultViewMode = 'week',
  dailySchedules,
  editable = false,
  onLessonClick,
  setStartDate,
  setLimit,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>(defaultViewMode);

  return (
    <div className="mb-10">
      <CalendarControl
        viewMode={viewMode}
        setViewMode={setViewMode}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <div className="overflow-auto rounded-md border border-border bg-card/30">
        <div className="min-w-[950px] text-sm">
          <CalendarHeader currentDate={currentDate} />
          {viewMode === 'month' ? (
            <CalendarCellMonth
              currentDate={currentDate}
              dailySchedules={dailySchedules}
              editable={editable}
              onLessonClick={onLessonClick}
              setStartDate={setStartDate}
              setLimit={setLimit}
            />
          ) : (
            <CalendarCellWeek
              currentDate={currentDate}
              dailySchedules={dailySchedules}
              editable={editable}
              onLessonClick={onLessonClick}
              setStartDate={setStartDate}
              setLimit={setLimit}
            />
          )}
        </div>
      </div>
    </div>
  );
};
