'use client';

import { Plus } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { AddExistingStudentToGroupForm } from './add-existing-student-to-group/add-existing-student-to-group-form';
import { CreateStudentAndAddToGroupWithExcel } from './add-students-to-group-with-excel-form';
import { CreateAndAddStudent } from './create-and-add-student-to-group-form';

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
          <DialogDescription>
            Add new students with three options.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="add-existing" className="mx-auto sm:mx-0">
          <TabsList className="mb-4">
            <TabsTrigger value="add-existing">Add Existing</TabsTrigger>
            <TabsTrigger value="create-and-add">Create and Add</TabsTrigger>
            <TabsTrigger value="add-with-excel">Add with Excel</TabsTrigger>
          </TabsList>
          <TabsContent value="add-existing">
            <AddExistingStudentToGroupForm groupId={groupId} />
          </TabsContent>
          <TabsContent value="create-and-add">
            <CreateAndAddStudent groupId={groupId} />
          </TabsContent>
          <TabsContent value="add-with-excel">
            <CreateStudentAndAddToGroupWithExcel groupId={groupId} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
