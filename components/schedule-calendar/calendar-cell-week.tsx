'use client';
import { addDays, format } from 'date-fns';
import type { FC } from 'react';
import { useMemo } from 'react';

import { LessonStatusColorsMap, getStartOfWeek } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import type { IDailySchedule } from '@/types/daily-schedule.interface';
import type { ILessonPreview } from '@/types/lesson.interface';
import { EditDailySchedule } from '@/app/admin/management/groups/[slug]/timetable/_components/edit-daily-schedule-modal';

interface CalendarCellProps extends React.HTMLAttributes<HTMLDivElement> {
  currentDate: Date;
  dailySchedules: Array<IDailySchedule>;
  editable: boolean;
}

export const CalendarCellWeek: FC<CalendarCellProps> = ({
  currentDate,
  dailySchedules,
  editable,
}) => {
  const startOfWeek = useMemo(() => getStartOfWeek(currentDate), [currentDate]);

  return (
    <div className="grid min-h-[250px] grid-cols-7">
      {Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i)).map(
        (day, i) => (
          <div key={i} className="group flex-1 border border-border px-2 py-1">
            {dailySchedules.map((dailySchedule: IDailySchedule) => {
              if (dailySchedule.courseDate === format(day, 'yyyy-MM-dd')) {
                return (
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
                      {dailySchedule.lessons.map((lesson: ILessonPreview) => (
                        <div
                          key={lesson.id}
                          className="flex justify-between rounded-md bg-green-500/20 p-2"
                        >
                          <div className="space-y-0.5">
                            <h4 title={lesson.courseName} className="truncate">
                              {lesson.courseName}
                            </h4>
                            <div className="truncate text-xs text-muted-foreground">
                              at {lesson.startTime.slice(0, -3)} -{' '}
                              {lesson.endTime.slice(0, -3)}
                            </div>
                            <div
                              className="truncate text-xs"
                              title={lesson.teacherName}
                            >
                              {lesson.teacherName}
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
                );
              }
            })}
          </div>
        )
      )}
    </div>
  );
};
