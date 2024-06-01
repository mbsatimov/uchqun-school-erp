import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { CreateSemesterForm } from './_components/create-semester-form';
import { SemesterList } from './_components/semester-list';

function SemesterPage() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="mr-1" size={20} />
            <span>Create new semester</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-full overflow-y-auto sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Create new semester</DialogTitle>
          </DialogHeader>
          <CreateSemesterForm />
        </DialogContent>
      </Dialog>
      <SemesterList />
    </div>
  );
}

export default SemesterPage;
