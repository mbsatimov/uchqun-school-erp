'use client';

import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';
import type { ReactCropperElement } from 'react-cropper';
import { Cropper } from 'react-cropper';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { useUpdateUserProfileImage } from '@/hooks/use-user';
import { DefaultError } from '@/lib/exceptions/default-exception';

import 'cropperjs/dist/cropper.css';

interface UploadProfileImageProps {
  userId: number;
  role: Role;
  file: File | null;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const ProfileImageUploader: FC<UploadProfileImageProps> = ({
  userId,
  role,
  file,
  setDialogOpen,
  setFile,
}) => {
  const uploadProfileImage = useUpdateUserProfileImage(userId);

  const cropperRef = useRef<ReactCropperElement>(null);

  const handleSave = async () => {
    if (cropperRef.current !== null) {
      const dataUrl = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      const formData = new FormData();
      formData.append('image', blob);
      uploadProfileImage.mutate({ id: userId, data: formData, role });
    }
  };

  useEffect(() => {
    if (uploadProfileImage.isSuccess) {
      setDialogOpen(false);
      setFile(null);
    }
  }, [setDialogOpen, uploadProfileImage.isSuccess, setFile]);

  if (uploadProfileImage.isError) throw new DefaultError();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <Cropper
          src={file ? URL.createObjectURL(file) : ''}
          className="h-[400px] w-[400px] overflow-hidden rounded-md"
          aspectRatio={1}
          ref={cropperRef}
          viewMode={1}
          guides={true}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          checkOrientation={false}
        />
      </div>
      <DialogFooter>
        <Button
          onClick={handleSave}
          disabled={uploadProfileImage.isPending}
          isLoading={uploadProfileImage.isPending}
        >
          Save
        </Button>
      </DialogFooter>
    </div>
  );
};
