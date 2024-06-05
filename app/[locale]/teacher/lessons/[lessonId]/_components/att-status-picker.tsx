'use client';

import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import { AttendanceStatusColorsMap } from '@/lib/helpers';
import { cn } from '@/lib/utils';

import { Attendances } from './student-list';

interface IAttStatusPickerProps {
  item: Attendances;
  setStudentsAttendance: React.Dispatch<
    React.SetStateAction<Array<Attendance>>
  >;
}
export const AttStatusPicker: FC<IAttStatusPickerProps> = ({
  item,
  setStudentsAttendance,
}) => {
  const handleStatusChange = (newStatus: AttendanceStatus) => {
    setStudentsAttendance(attendances => {
      return attendances.map(attendance => {
        if (attendance.student.id === item.id) {
          return { ...attendance, status: newStatus };
        }
        return attendance;
      });
    });
  };
  const handleStatusButtonClick = () => {
    if (item.status === 'PRESENT') {
      handleStatusChange('ABSENT');
    } else if (item.status === 'ABSENT') {
      handleStatusChange('LATE');
    } else if (item.status === 'LATE') {
      handleStatusChange('PRESENT');
    } else {
      handleStatusChange('PRESENT');
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <Button
        className={cn('min-w-[100px]', AttendanceStatusColorsMap[item.status])}
        size={'sm'}
        onClick={handleStatusButtonClick}
      >
        {item.status}
      </Button>
    </div>
  );
};
