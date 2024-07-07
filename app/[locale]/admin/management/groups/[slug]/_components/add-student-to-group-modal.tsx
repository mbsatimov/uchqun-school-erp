'use client';

import { Plus } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { AddExistingStudentToGroupForm } from './add-existing-student-to-group/add-existing-student-to-group-form';

interface AddStudentToGroupProps {
  groupId: number;
}

export const AddStudentToGroupModal: FC<AddStudentToGroupProps> = ({
  groupId,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-1" size={20} />
          <span>Add Student</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-full overflow-y-auto sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
        </DialogHeader>
        <AddExistingStudentToGroupForm groupId={groupId} />
      </DialogContent>
    </Dialog>
  );
};
