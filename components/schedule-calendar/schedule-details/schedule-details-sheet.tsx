import { format } from 'date-fns';
import { Expand } from 'lucide-react';
import type { FC } from 'react';

import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui';
import { LessonStatusColorsMap } from '@/lib/helpers';
import { cn } from '@/lib/utils';

type ScheduleDetailsSheetProps = {
  dailySchedule: DailySchedule;
};

export const ScheduleDetailsSheet: FC<ScheduleDetailsSheetProps> = ({
  dailySchedule,
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={'outline'} size={'icon'} className="h-7 w-7">
          <Expand size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-full sm:min-w-[450px]">
        <SheetHeader>
          <SheetTitle>
            {format(dailySchedule.courseDate, 'dd MMMM yyyy')}
          </SheetTitle>
          {dailySchedule.lessons.map((lesson: LessonPreview) => (
            <div
              key={lesson.id}
              className="flex justify-between rounded-md bg-green-500/20 p-2"
            >
              <div className="space-y-1">
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
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
