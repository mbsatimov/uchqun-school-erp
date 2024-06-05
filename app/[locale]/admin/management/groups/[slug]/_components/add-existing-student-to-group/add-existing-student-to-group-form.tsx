'use client';

import { X } from 'lucide-react';
import React from 'react';

import { useGetGroupById } from '@/hooks/use-group';
import { useUpdateSomeStudentsGroup } from '@/hooks/use-student';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import { StudentSelectionPopover } from './student-selection-popover';

interface AddExistingProps {
  groupId: number;
}

export const AddExistingStudentToGroupForm: React.FC<AddExistingProps> = ({
  groupId,
}) => {
  const group = useGetGroupById(groupId);
  const addStudentToGroup = useUpdateSomeStudentsGroup(groupId);

  const [selectedStudents, setSelectedSTudents] = React.useState<
    Array<IStudentPreview>
  >([]);

  const handleSubmit = () => {
    const ids = selectedStudents.map(student => student.id);
    addStudentToGroup.mutateAsync({ groupId, ids }).then(() => {
      setSelectedSTudents([]);
    });
  };

  if (group.isError) throw new DefaultError();

  const handleUnselect = (id: number) => {
    setSelectedSTudents(selectedStudents.filter(student => student.id !== id));
  };

  return (
    <div className="space-y-4">
      <Label>Select students</Label>
      <StudentSelectionPopover
        groupId={groupId}
        selectedStudents={selectedStudents}
        setSelectedStudents={setSelectedSTudents}
      />
      <div className="flex flex-wrap gap-1">
        {selectedStudents.map(({ name, surname, groupId, id }) => (
          <Badge
            key={id}
            variant="outline"
            title={
              groupId
                ? 'Already assigned to group'
                : 'Not assigned to any group yet'
            }
            className={cn('bg-green-500/20 text-green-500', {
              'bg-yellow-500/20 text-yellow-500': groupId,
            })}
          >
            {name} {surname}
            <button
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => handleUnselect(id)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
      </div>
      <p>Selected students will be added to this group.</p>
      <DialogFooter>
        <Button
          onClick={handleSubmit}
          disabled={addStudentToGroup.isPending}
          isLoading={addStudentToGroup.isPending}
        >
          Save
        </Button>
      </DialogFooter>
    </div>
  );
};
