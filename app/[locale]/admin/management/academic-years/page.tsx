import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { AcademicYearForm } from './_components/academic-year-form';
import { AcademicYearList } from './_components/academic-year-list';

const AcademicYears = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="mr-1" size={20} />
            <span>Create new academic year</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-full overflow-y-auto sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Create new academic year</DialogTitle>
          </DialogHeader>
          <AcademicYearForm />
        </DialogContent>
      </Dialog>
      <AcademicYearList />
    </div>
  );
};

export default AcademicYears;
