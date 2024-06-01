'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetUserById } from '@/hooks/use-user';
import { getCurrentUser } from '@/lib/auth.helper';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { UploadProfileImageSchema } from '@/lib/validators/upload-profile-image.schema';

import { ProfileImageUploader } from './profile-image-uploader';
import { UserAvatar } from './user-avatar';

const validateFile = (file: File | null) => {
  try {
    UploadProfileImageSchema.parse({ image: file });
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
    }
    return false;
  }
};

export const UserProfileDetails = () => {
  const user = useGetUserById(getCurrentUser().id, getCurrentUser().role);
  const filePicker = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setOpen(true);
      } else {
        toast.error('We only support PNG or JPG pictures.');
      }
    }
  };

  if (user.isError) throw new DefaultError();

  return (
    <div className="space-y-4">
      <div className="mx-auto w-fit overflow-hidden px-6">
        <input
          ref={filePicker}
          className="hidden"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileSelect}
        />
        {!mounted || user.isLoading || !user.data ? (
          <>
            <Skeleton className="h-[200px] w-[200px] rounded-full border-[3px] border-primary" />
          </>
        ) : (
          <UserAvatar user={user.data} filePicker={filePicker} />
        )}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-h-full overflow-y-auto sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Upload Image</DialogTitle>
            </DialogHeader>
            {user.data ? (
              <ProfileImageUploader
                userId={user.data?.id}
                role={user.data?.role}
                file={file}
                setDialogOpen={setOpen}
                setFile={setFile}
              />
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
      {!mounted || user.isLoading ? (
        <Skeleton className="mx-auto h-7 w-48" />
      ) : (
        <h2 className="mb-2 text-center text-xl font-bold">
          {user.data?.name} {user.data?.surname}
        </h2>
      )}
    </div>
  );
};
