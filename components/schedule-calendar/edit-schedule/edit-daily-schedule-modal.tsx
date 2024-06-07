import { Edit } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { DailyScheduleLessonsList } from './daily-schedule-lessons-list';
import { LessonForm } from './lesson-form';

interface EditDailyScheduleProps {
  dailySchedule: DailySchedule;
}

export const EditDailySchedule: React.FC<EditDailyScheduleProps> = ({
  dailySchedule,
}) => {
  const [lesson, setLesson] = useState<LessonPreview>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} size={'icon'} className="h-7 w-7">
          <Edit size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit daily schedule</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          {!lesson && <LessonForm dailyScheduleId={dailySchedule.id} />}
          {!!lesson && (
            <LessonForm
              dailyScheduleId={dailySchedule.id}
              lesson={lesson}
              setLesson={setLesson}
            />
          )}
          <DailyScheduleLessonsList
            setLesson={setLesson}
            dailySchedule={dailySchedule}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
