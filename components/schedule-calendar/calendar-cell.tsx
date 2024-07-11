import { ArrowRight } from 'lucide-react';
import type { FC } from 'react';

import { EditDailySchedule } from '@/components/schedule-calendar/edit-schedule/edit-daily-schedule-modal';
import { Button } from '@/components/ui/button';
import { LessonStatusColorsMap } from '@/lib/helpers';
import { cn } from '@/lib/utils';

import { ScheduleDetailsSheet } from './schedule-details';

interface CalendarCellProps {
  dailySchedule: DailySchedule;
  editable: boolean;
  day: Date;
  onLessonClick?: (lesson: LessonPreview) => void;
}

export const CalendarCell: FC<CalendarCellProps> = ({
  dailySchedule,
  editable,
  day,
  onLessonClick,
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
        <div className="space-x-2 group-hover:visible md:invisible">
          {editable &&
            day.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0) &&
            !isSomeLessonsComplete && (
              <EditDailySchedule dailySchedule={dailySchedule} />
            )}
          {dailySchedule.lessons.length ? (
            <ScheduleDetailsSheet dailySchedule={dailySchedule} />
          ) : null}
        </div>
      </div>
      <div className="space-y-1.5">
        {dailySchedule.lessons.map((lesson: LessonPreview) => (
          <div
            key={lesson.id}
            className="relative flex justify-between overflow-hidden rounded-md bg-green-500/20 p-2"
          >
            <div className="group/lesson flex min-w-[200%] items-center gap-2 space-y-0.5 transition-transform hover:translate-x-[-50%]">
              <h4 className="flex-1">{lesson.courseName}</h4>
              <div className="invisible flex flex-1 items-center justify-between text-nowrap text-xs text-muted-foreground opacity-0 transition-all group-hover/lesson:visible group-hover/lesson:opacity-100">
                <p>
                  {lesson.startTime.slice(0, -3)} -{' '}
                  {lesson.endTime.slice(0, -3)}
                </p>
                {!!onLessonClick && (
                  <Button
                    title="Open lesson"
                    variant={'outline'}
                    size={'icon'}
                    className="h-6 w-6"
                    onClick={() => onLessonClick?.(lesson)}
                  >
                    <ArrowRight size={16} />
                  </Button>
                )}
              </div>
            </div>
            <div
              className={cn(
                'absolute right-0 top-0 h-full w-1 cursor-pointer rounded-e-md',
                LessonStatusColorsMap[lesson.lessonStatus]
              )}
              title={lesson.lessonStatus}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
