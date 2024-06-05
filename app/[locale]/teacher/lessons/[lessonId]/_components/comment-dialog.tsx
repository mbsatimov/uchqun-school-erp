import { DialogTrigger } from '@radix-ui/react-dialog';
import { MessageCircleMore } from 'lucide-react';
import { FC, useState } from 'react';

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

import { Attendances } from './student-list';

interface CommentDialogProps {
  item: Attendances;
  setStudentsAttendance: React.Dispatch<
    React.SetStateAction<Array<Attendance>>
  >;
}

export const CommentDialog: FC<CommentDialogProps> = ({
  item,
  setStudentsAttendance,
}) => {
  const [comment, setComment] = useState(item.comment || '');
  const handleCommentSave = (newComment: string) => {
    setStudentsAttendance(attendances =>
      attendances.map(attendance => {
        if (attendance.student.id === item.id) {
          return { ...attendance, comment: newComment };
        }
        return attendance;
      })
    );
  };

  return (
    <Dialog onOpenChange={() => setComment(item.comment || '')}>
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
          <DialogClose asChild>
            <Button type="submit" onClick={() => handleCommentSave(comment)}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
