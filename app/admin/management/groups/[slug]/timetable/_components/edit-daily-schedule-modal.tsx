import { Edit } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { IDailySchedule } from '@/types/daily-schedule.interface';

import { AddLesson } from './add-lesson';
import { DailyScheduleLessons } from './daily-schedule-lessons';

interface EditDailyScheduleProps {
  dailySchedule: IDailySchedule;
}

export const EditDailySchedule: React.FC<EditDailyScheduleProps> = ({
  dailySchedule,
}) => {
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
          <AddLesson dailyScheduleId={dailySchedule.id} />
          <DailyScheduleLessons dailySchedule={dailySchedule} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
