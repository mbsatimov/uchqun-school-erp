import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import type { FC } from 'react';

import {
  useDeleteStudent,
  useRemoveStudentFromGroup,
} from '@/hooks/use-student';
import type { IStudentWithGroupPreview } from '@/types/student.interface';
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
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { GroupStudentsTableColumnHeader } from './group-students-table-column-header';

const DeleteStudentMenuItem: FC<{ studentId: number; groupId: number }> = ({
  studentId,
  groupId,
}) => {
  const deleteStudentMutation = useDeleteStudent(groupId);

  const handleDeleteStudent = () => {
    deleteStudentMutation.mutate(studentId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        Delete student
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete student
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteStudent}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const RemoveStudentFromGroupMenuItem: FC<{
  studentId: number;
  groupId: number;
}> = ({ studentId, groupId }) => {
  const removeStudentFromGroupMutation = useRemoveStudentFromGroup(groupId);

  const handleRemoveStudentFromGroup = () => {
    removeStudentFromGroupMutation.mutate(studentId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        Remove from group
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove student
            from this group, but not from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveStudentFromGroup}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const columns: Array<ColumnDef<IStudentWithGroupPreview>> = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <GroupStudentsTableColumnHeader column={column} title="Full name" />
    ),
    cell: ({ row }) => {
      const { name, surname } = row.original;
      const fullName = `${name} ${surname}`;

      return <div>{fullName}</div>;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <GroupStudentsTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <GroupStudentsTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      const phoneNumber: string = row.getValue('phoneNumber');

      // Format the phone as a phone number
      const formatted = `${phoneNumber.substring(
        0,
        4
      )} (${phoneNumber.substring(4, 6)}) ${phoneNumber.substring(
        6,
        9
      )}-${phoneNumber.substring(9, 11)}-${phoneNumber.substring(11, 13)}`;

      return <div className="font-mono font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(student.email)}
            >
              Copy email
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(student.phoneNumber)}
            >
              Copy phone
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <RemoveStudentFromGroupMenuItem
              studentId={student.id}
              groupId={student.groupId}
            />
            <DeleteStudentMenuItem
              studentId={student.id}
              groupId={student.groupId}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
