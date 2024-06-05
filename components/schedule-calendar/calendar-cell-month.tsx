'use client';
import { format, isSameMonth } from 'date-fns';
import type { FC } from 'react';
import { useMemo } from 'react';

import { EditDailySchedule } from '@/app/[locale]/admin/management/groups/[slug]/timetable/_components/edit-daily-schedule-modal';
import { LessonStatusColorsMap, getWeeks } from '@/lib/helpers';
import { cn } from '@/lib/utils';

interface CalendarCellMonthProps extends React.HTMLAttributes<HTMLDivElement> {
  currentDate: Date;
  dailySchedules: Array<IDailySchedule>;
  editable: boolean;
}

export const CalendarCellMonth: FC<CalendarCellMonthProps> = ({
  currentDate,
  dailySchedules,
  editable,
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
              <div key={dailySchedule.id}>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center justify-center">
                    {day.getDate()}
                  </div>
                  <div className="invisible group-hover:visible">
                    {editable ? (
                      <EditDailySchedule dailySchedule={dailySchedule} />
                    ) : null}
                  </div>
                </div>
                <div className="space-y-1.5">
                  {dailySchedule.lessons.map(lesson => (
                    <div
                      key={lesson.id}
                      className="flex justify-between rounded-md bg-green-500/20 p-2"
                    >
                      <div>
                        <h4 className="truncate" title={lesson.courseName}>
                          {lesson.courseName}
                        </h4>
                        <div className="truncate text-xs text-muted-foreground">
                          at {lesson.startTime.slice(0, -3)} -{' '}
                          {lesson.endTime.slice(0, -3)}
                        </div>
                      </div>
                      <div
                        className={cn(
                          'w-1 cursor-pointer rounded-e-md',
                          LessonStatusColorsMap[lesson.lessonStatus]
                        )}
                        title={lesson.lessonStatus}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  ));
};
