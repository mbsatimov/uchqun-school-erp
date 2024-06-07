import { FC } from 'react';

import { EditDailySchedule } from '@/components/schedule-calendar/edit-schedule/edit-daily-schedule-modal';
import { LessonStatusColorsMap } from '@/lib/helpers';
import { cn } from '@/lib/utils';

interface CalendarCellProps {
  dailySchedule: IDailySchedule;
  editable: boolean;
  day: Date;
}

export const CalendarCell: FC<CalendarCellProps> = ({
  dailySchedule,
  editable,
  day,
}) => {
  const isSomeLessonsComplete = dailySchedule.lessons.some(
    lesson => lesson.lessonStatus === 'COMPLETED'
  );

  return (
    <div key={dailySchedule.id}>
      <div className="mb-1 flex items-center justify-between">
        <div className="flex h-[28px] items-center justify-center">
          {day.getDate()}
        </div>
        <div className="invisible group-hover:visible">
          {editable &&
            day.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0) &&
            !isSomeLessonsComplete && (
              <EditDailySchedule dailySchedule={dailySchedule} />
            )}
        </div>
      </div>
      <div className="space-y-1.5">
        {dailySchedule.lessons.map((lesson: LessonPreview) => (
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
              <div className="truncate text-xs" title={lesson.teacherName}>
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
};
