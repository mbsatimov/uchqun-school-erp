import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { EnumRole } from '@/types/user.interface';

import { CreateUserWithExcel } from './create-users-with-excel';
import { UserForm } from './user-form';

const USERS = [
  {
    label: 'Student',
    value: EnumRole.STUDENT,
  },
  {
    label: 'Teacher',
    value: EnumRole.TEACHER,
  },
  {
    label: 'Admin',
    value: EnumRole.ADMIN,
  },
];

export const CreateUserModal = () => {
  return (
    <Card
      tabIndex={1}
      className={cn(
        'group relative flex w-[40px] items-center justify-center transition-all hover:w-fit'
      )}
    >
      <Plus className="absolute bottom-1/2 left-0 z-30 h-10 w-10 translate-y-1/2 cursor-pointer p-2 transition-all group-hover:rotate-45" />
      <div className="invisible ml-8 translate-x-[-20%] whitespace-nowrap opacity-0 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100">
        {USERS.map(user => (
          <Dialog key={user.value}>
            <DialogTrigger asChild>
              <Button variant={'ghost'}>{user.label}</Button>
            </DialogTrigger>
            <DialogContent className="max-h-full overflow-y-auto sm:max-w-[450px]">
              <DialogHeader>
                <DialogTitle>Add new {user.label}</DialogTitle>
                <DialogDescription>
                  Add <span className="lowercase">{user.label}s</span> with two
                  option.
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="create">
                <TabsList className="mb-4">
                  <TabsTrigger value="create">Create and Add</TabsTrigger>
                  <TabsTrigger value="create-with-excel">
                    Add with Excel
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="create">
                  <UserForm role={user.value} />
                </TabsContent>
                <TabsContent value="create-with-excel">
                  <CreateUserWithExcel role={user.value} />
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </Card>
  );
};
