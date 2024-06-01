'use client';
import { Trash } from 'lucide-react';
import React from 'react';

import { useDeleteLesson } from '@/hooks/use-lesson';
import type { IDailySchedule } from '@/types/daily-schedule.interface';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface IDailyScheduleLessonsProps {
  dailySchedule: IDailySchedule;
}

export const DailyScheduleLessons: React.FC<IDailyScheduleLessonsProps> = ({
  dailySchedule,
}) => {
  const deleteLesson = useDeleteLesson(dailySchedule.id);
  const [deleteAll, setDeleteAll] = React.useState(false);

  const handleDelete = (lessonId: number) => {
    deleteLesson.mutate({ lessonId, allWeeks: deleteAll });
  };

  if (dailySchedule.lessons.length === 0) {
    return (
      <p className="flex items-center justify-center text-muted-foreground">
        No lessons
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {dailySchedule.lessons.map((lesson, index) => (
        <li
          key={index}
          className="rounded-md border border-green-500 bg-green-500/20 p-3"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="truncate text-lg" title={lesson.courseName}>
              {lesson.courseName}
            </span>
            <AlertDialog>
              <AlertDialogTrigger title="Delete lesson">
                <Trash className="h-5 w-5 text-destructive" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {deleteAll
                      ? `This action cannot be undone. This will delete all ${lesson.courseName} lessons from this date to the end of semester.`
                      : `This action cannot be undone. This will delete lesson ${lesson.courseName} for this date.`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-between">
                  <Label>Delete for all next weeks</Label>
                  <Switch checked={deleteAll} onCheckedChange={setDeleteAll} />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(lesson.id)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="flex items-center justify-between">
            <span className="truncate text-sm" title={lesson.teacherName}>
              {lesson.teacherName}
            </span>
            <span className="mr-2 whitespace-nowrap text-end text-sm text-muted-foreground">
              {lesson.startTime.slice(0, -3)} - {lesson.endTime.slice(0, -3)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
