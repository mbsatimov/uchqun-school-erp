import { DialogTrigger } from '@radix-ui/react-dialog';
import { MessageCircleMore } from 'lucide-react';
import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Textarea,
} from '@/components/ui';

export const CommentDialog = () => {
  const [comment, setComment] = useState<string>('');

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'default'} className="" size={'icon-sm'}>
          <MessageCircleMore className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write comment for student</DialogTitle>
          <DialogDescription>
            This message will be sent to the student and its parent
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Enter comment"
        >
          {comment}
        </Textarea>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant={'outline'}>Cancel</Button>
          </DialogClose>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
