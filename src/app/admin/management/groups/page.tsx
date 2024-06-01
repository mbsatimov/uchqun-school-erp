import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { CreateGroupForm } from './_components/create-group-form';
import { GroupList } from './_components/group-list';

function GroupsPage() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="mr-1" size={20} />
            <span>Create new group</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-full overflow-y-auto sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Create new group</DialogTitle>
          </DialogHeader>
          <CreateGroupForm />
        </DialogContent>
      </Dialog>
      <GroupList />
    </>
  );
}

export default GroupsPage;
