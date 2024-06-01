import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { CoursesList } from './_components/course-list';
import { CreateCourseForm } from './_components/create-course-form';

function CoursesPage() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="mr-1" size={20} />
            <span>Add new course</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-full overflow-y-auto sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Add new course</DialogTitle>
          </DialogHeader>
          <CreateCourseForm />
        </DialogContent>
      </Dialog>
      <CoursesList />
    </>
  );
}

export default CoursesPage;
