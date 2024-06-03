'use client';

import { Edit } from 'lucide-react';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteUserProfileImage } from '@/hooks/use-user';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  user: User;
  filePicker: React.RefObject<HTMLInputElement>;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, filePicker }) => {
  const deleteProfileImage = useDeleteUserProfileImage(user.id);
  const handlePick = () => {
    if (filePicker.current) {
      filePicker.current.click();
    }
  };

  const handleDelete = () => {
    deleteProfileImage.mutate({ id: user.id, role: user.role });
  };

  return (
    <div className="relative">
      <Avatar className="h-[200px] w-[200px] border-[3px] border-primary">
        <AvatarImage src={user.attachment?.url} />
        <AvatarFallback className="text-4xl font-bold">
          {user.name?.charAt(0)}
          {user.surname?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({ variant: 'default', size: 'icon' }),
            'absolute bottom-3 right-3'
          )}
        >
          <Edit className="h-8 w-8 p-1" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handlePick}>
            Upload a photo
          </DropdownMenuItem>
          {user.attachment ? (
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive"
            >
              Remove photo
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
