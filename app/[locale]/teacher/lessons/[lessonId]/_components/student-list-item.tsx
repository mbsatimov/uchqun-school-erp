import { FC } from 'react';

import { Card } from '@/components/ui';

import { AttStatusPicker } from './att-status-picker';
import { CommentDialog } from './comment-dialog';
import { GradeDialog } from './grade-dialog';

interface StudentAttendanceListItemProps {
  item: {
    status: AttendanceStatus;
    id: number;
    groupId: number | null;
    name: string;
    surname: string;
    phoneNumber: string;
    attachment: Attachment | null;
    role: Role;
  };
  index: number;
  setStudentsAttendance: React.Dispatch<
    React.SetStateAction<Array<Attendance>>
  >;
}

export const StudentAttendanceListItem: FC<StudentAttendanceListItemProps> = ({
  item,
  index,
  setStudentsAttendance,
}) => {
  return (
    <div key={item.id} className="flex items-center gap-4">
      <Card className="flex flex-1 flex-col justify-between gap-4 p-3 sm:flex-row sm:items-center">
        <div className="flex text-sm sm:text-base">
          <div className="ml-2 mr-6">{index + 1}.</div>
          <div>
            {item.name} {item.surname}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <AttStatusPicker
            currentStatus={item.status}
            setCurrentStatus={(newStatus: AttendanceStatus) => {
              setStudentsAttendance(attendances => {
                return attendances.map(attendance => {
                  if (attendance.student.id === item.id) {
                    return { ...attendance, status: newStatus };
                  }
                  return attendance;
                });
              });
            }}
          />
          <GradeDialog />
          <CommentDialog />
        </div>
      </Card>
    </div>
  );
};
