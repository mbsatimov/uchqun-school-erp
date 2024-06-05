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
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useDeleteCourse } from '@/hooks/use-course';
import { cn } from '@/lib/utils';

interface CourseItemProps {
  course: Course;
}

export const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  const deleteCourse = useDeleteCourse();

  const handleDelete = () => {
    deleteCourse.mutate(course.id);
  };

  return (
    <Card key={course.id}>
      <CardHeader className="flex flex-row items-center justify-between p-3">
        <CardTitle className="truncate text-lg">{course.name}</CardTitle>
        <AlertDialog>
          <AlertDialogTrigger
            className={cn('text-destructive')}
            title="Delete course"
          >
            <Trash size={20} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                course &quot;{course.name}&quot;.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
    </Card>
  );
};
