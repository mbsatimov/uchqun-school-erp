import { MoreHorizontal } from 'lucide-react';
import { FC, useState } from 'react';

import { UserModal } from '@/app/[locale]/admin/management/users/_components/user-modal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteSomeUsers } from '@/hooks/use-user';
import { cn } from '@/lib/utils';

type UserTableCellMenuProps = {
  user: User;
};

export const UserTableCellMenu: FC<UserTableCellMenuProps> = ({ user }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[150px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(user.phoneNumber)}
          >
            Copy phone
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn('text-destructive')}
            title="Delete course"
            onSelect={() => setOpenEdit(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UserModal
        open={openEdit}
        setOpen={setOpenEdit}
        user={user}
        role={user.role}
      />
      <DeleteUserAlertDialog
        user={user}
        open={openDelete}
        setOpen={setOpenDelete}
      />
    </>
  );
};

type DeleteUserMenuItemProps = {
  user: User;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteUserAlertDialog: FC<DeleteUserMenuItemProps> = ({
  user,
  open,
  setOpen,
}) => {
  const deleteUserMutation = useDeleteSomeUsers();

  const handleDeleteUser = () => {
    deleteUserMutation.mutate([{ id: user.id, role: user.role }]);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete course
            &quot;&quot;.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild onClick={handleDeleteUser}>
            <Button variant={'destructive'}>Delete</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
