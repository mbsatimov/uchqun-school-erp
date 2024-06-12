import { FC } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CreateUserWithExcel } from './create-users-with-excel';
import { UserForm } from './user-form';

export const roleMap: Record<Role, string> = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
};
type UserModalProps = {
  user?: User;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  role: Role;
};

export const UserModal: FC<UserModalProps> = ({
  user,
  open,
  setOpen,
  role,
}) => {
  return (
    <Dialog key={role} open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-full overflow-y-auto sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            {user ? 'Update ' : 'Add new'} {roleMap[role]}
          </DialogTitle>
          {!user && (
            <DialogDescription>
              Add <span className="lowercase">{roleMap[role]}s</span> with two
              option.
            </DialogDescription>
          )}
        </DialogHeader>
        {!user && (
          <Tabs defaultValue="create">
            <TabsList className="mb-4">
              <TabsTrigger value="create">Create and Add</TabsTrigger>
              <TabsTrigger value="create-with-excel">
                Add with Excel
              </TabsTrigger>
            </TabsList>
            <TabsContent value="create">
              <UserForm role={role} />
            </TabsContent>
            <TabsContent value="create-with-excel">
              <CreateUserWithExcel role={role} />
            </TabsContent>
          </Tabs>
        )}
        {!!user && <UserForm role={role} user={user} />}
      </DialogContent>
    </Dialog>
  );
};
