'use client';

import { CheckCheckIcon } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUpdateAttendance } from '@/hooks/use-attendance';
import { useSearch } from '@/hooks/use-search';
import { getCurrentUser } from '@/lib/auth.helper';
import type {
  AttendanceStatus,
  IAttendance,
  IUpdateAttendancesRequest,
} from '@/types/attendance.interface';

import { AttStatusPicker } from './att-status-picker';

interface StudentListProps {
  attendances: Array<IAttendance>;
  lessonId: number;
}

export const StudentList: React.FC<StudentListProps> = ({
  attendances,
  lessonId,
}) => {
  const updateAttendance = useUpdateAttendance(lessonId, getCurrentUser().id);

  const [studentsAttendance, setStudentsAttendance] = useState(
    attendances.sort((a, b) => a.student.name.localeCompare(b.student.name))
  );
  const { filteredData, inputValue, setInputValue } = useSearch({
    data: studentsAttendance.map(attendance => ({
      ...attendance.student,
      status: attendance.status,
      id: attendance.student.id,
    })),
    searchBy: ['status', 'name', 'surname'],
  });

  const handleSubmit = () => {
    const attendancesRequest: Array<IUpdateAttendancesRequest> =
      studentsAttendance.map(attendance => {
        return {
          id: attendance.id,
          studentId: attendance.student.id,
          status: attendance.status,
          lessonId: lessonId,
        };
      });

    updateAttendance.mutate(attendancesRequest);
  };
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Save Attendance</Button>
      </div>
      <div className="flex justify-between gap-2 py-4">
        <div className="w-full max-w-sm">
          <Input
            placeholder={`Search (e.g. '${filteredData[0]?.name} ${filteredData[0]?.surname}', 'present')`}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </div>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              variant={'ghost'}
              size={'icon'}
              onClick={() => {
                setStudentsAttendance(attendances => {
                  return attendances.map(attendance => {
                    return { ...attendance, status: 'PRESENT' };
                  });
                });
              }}
            >
              <CheckCheckIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mark all as present</TooltipContent>
        </Tooltip>
      </div>
      <div className="space-y-4">
        {filteredData.map((item, index) => (
          <Card key={item.id} className="flex items-center justify-between p-3">
            <div className="flex text-sm sm:text-base">
              <div className="ml-2 mr-6">{index + 1}.</div>
              <div>
                {item.name} {item.surname}
              </div>
            </div>
            <div>
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
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
