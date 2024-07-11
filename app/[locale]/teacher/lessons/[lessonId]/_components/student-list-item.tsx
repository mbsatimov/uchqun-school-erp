import { FC } from 'react';

import { Card } from '@/components/ui/card';

import { AttStatusPicker } from './att-status-picker';
import { CommentDialog } from './comment-dialog';
import { GradeHoverCard } from './grade-hover-card';
import { Attendances } from './student-list';

interface StudentAttendanceListItemProps {
  item: Attendances;
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
            item={item}
            setStudentsAttendance={setStudentsAttendance}
          />
          <GradeHoverCard
            item={item}
            setStudentsAttendance={setStudentsAttendance}
          />
          <CommentDialog
            item={item}
            setStudentsAttendance={setStudentsAttendance}
          />
        </div>
      </Card>
    </div>
  );
};
