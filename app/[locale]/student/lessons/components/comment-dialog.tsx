import { DialogTrigger } from '@radix-ui/react-dialog';
import { MessageCircleMore } from 'lucide-react';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CommentDialogProps {
  comment: string;
}

export const CommentDialog: FC<CommentDialogProps> = ({ comment }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'default'} size={'icon-sm'}>
          <MessageCircleMore className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Teacher comment</DialogTitle>
        </DialogHeader>
        {comment}
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
