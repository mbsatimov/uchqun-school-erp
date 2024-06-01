'use client';

import type { FC } from 'react';

import { AttendanceStatusColorsMap } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import type { AttendanceStatus } from '@/types/attendance.interface';
import { Button } from '@/components/ui/button';

interface IAttStatusPickerProps {
  currentStatus: AttendanceStatus;
  setCurrentStatus: (status: AttendanceStatus) => void;
}
export const AttStatusPicker: FC<IAttStatusPickerProps> = ({
  currentStatus,
  setCurrentStatus,
}) => {
  const handleStatusButtonClick = () => {
    if (currentStatus === 'PRESENT') {
      setCurrentStatus('ABSENT');
    } else if (currentStatus === 'ABSENT') {
      setCurrentStatus('LATE');
    } else if (currentStatus === 'LATE') {
      setCurrentStatus('PRESENT');
    } else {
      setCurrentStatus('PRESENT');
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <Button
        className={cn(
          'min-w-[100px]',
          AttendanceStatusColorsMap[currentStatus]
        )}
        size={'sm'}
        onClick={handleStatusButtonClick}
      >
        {currentStatus}
      </Button>
    </div>
  );
};
