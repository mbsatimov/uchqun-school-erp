'use client';

import { CheckCheckIcon } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUpdateAttendance } from '@/hooks/use-attendance';
import { useSearch } from '@/hooks/use-search';
import { getCurrentUser } from '@/lib/auth.helper';

import { StudentAttendanceListItem } from './student-list-item';

interface StudentListProps {
  attendances: Array<Attendance>;
  lessonId: number;
}

export type Attendances = {
  status: AttendanceStatus;
  grade: number;
  comment: string | null;
  id: number;
  groupId: number | null;
  name: string;
  surname: string;
  phoneNumber: string;
  attachment: Attachment | null;
  role: Role;
};

export const StudentList: React.FC<StudentListProps> = ({
  attendances,
  lessonId,
}) => {
  const updateAttendance = useUpdateAttendance(lessonId, getCurrentUser().id);

  const [studentsAttendance, setStudentsAttendance] = useState(
    attendances.sort((a, b) => a.student.name.localeCompare(b.student.name))
  );
  const { filteredData, inputValue, setInputValue } = useSearch<Attendances>({
    data: studentsAttendance.map(attendance => ({
      ...attendance.student,
      status: attendance.status,
      grade: attendance.grade || 0,
      comment: attendance.comment,
      id: attendance.student.id,
    })),
    searchBy: ['status', 'name', 'surname'],
  });

  const handleSubmit = () => {
    const attendancesRequest: Array<AttendancesRequest> =
      studentsAttendance.map(attendance => ({
        id: attendance.id,
        studentId: attendance.student.id,
        grade: attendance.grade,
        comment: attendance.comment?.trim(),
        status: attendance.status,
        lessonId: lessonId,
      }));

    updateAttendance.mutate(attendancesRequest);
  };

  const handleMarkAllAsPresent = () => {
    setStudentsAttendance(attendances => {
      return attendances.map(attendance => ({
        ...attendance,
        status: 'PRESENT',
      }));
    });
  };

  const canSave = () => {
    for (let i = 0; i < attendances.length; i++) {
      const attendance = attendances[i];
      const changedAttendance = studentsAttendance[i];
      if (
        (attendance.status !== changedAttendance.status &&
          attendance.status !== 'UNKNOWN') ||
        attendance.grade !== changedAttendance.grade ||
        attendance.comment !== changedAttendance.comment
      ) {
        return true;
      }
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          isLoading={updateAttendance.isPending}
          disabled={!canSave()}
        >
          Save Attendance
        </Button>
      </div>
      <div className="flex justify-between gap-2 py-4">
        <div className="w-full max-w-sm">
          <Input
            placeholder={'Search student'}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </div>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              variant={'ghost'}
              size={'icon'}
              onClick={handleMarkAllAsPresent}
            >
              <CheckCheckIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mark all as present</TooltipContent>
        </Tooltip>
      </div>
      <div className="space-y-4">
        {filteredData.map((item, index) => (
          <StudentAttendanceListItem
            key={item.id}
            item={item}
            index={index}
            setStudentsAttendance={setStudentsAttendance}
          />
        ))}
      </div>
    </div>
  );
};
