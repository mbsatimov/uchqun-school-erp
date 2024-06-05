'use client';

import { Trash } from 'lucide-react';
import React from 'react';

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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDeleteSemester } from '@/hooks/use-semester';
import { portionMap } from '@/lib/constants/portionMap';
import { cn } from '@/lib/utils';

interface SemesterItemProps {
  semester: ISemesterPreview;
}

export const SemesterItem: React.FC<SemesterItemProps> = ({ semester }) => {
  const deleteSemester = useDeleteSemester();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="truncate text-xl">
          {portionMap[semester.portion]}
        </CardTitle>

        <AlertDialog>
          <AlertDialogTrigger
            className={cn('text-destructive')}
            title="Delete semester"
          >
            <Trash />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                semester.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteSemester.mutate(semester.id)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent className="flex items-center justify-between space-y-1">
        <div className="text-sm text-muted-foreground">
          {semester.startDate} - {semester.endDate}
        </div>
      </CardContent>
    </Card>
  );
};
