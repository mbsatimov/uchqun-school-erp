import { FC } from 'react';
import { HiOutlineStar, HiStar } from 'react-icons/hi2';

import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui';
import { gradeColorMap } from '@/lib/constants';
import { cn } from '@/lib/utils';

import { Attendances } from './student-list';

interface GradeHoverCardProps {
  item: Attendances;
  setStudentsAttendance: React.Dispatch<
    React.SetStateAction<Array<Attendance>>
  >;
}

export const GradeHoverCard: FC<GradeHoverCardProps> = ({
  item,
  setStudentsAttendance,
}) => {
  const handleGradeChange = (grade: number) => {
    setStudentsAttendance(attendances =>
      attendances.map(attendance => {
        if (attendance.student.id === item.id) {
          return { ...attendance, grade: grade };
        }
        return attendance;
      })
    );
  };

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger>
        <Button variant={'outline'} size={'icon-sm'}>
          {item.grade === 0 ? (
            <HiOutlineStar className="size-5" />
          ) : (
            <HiStar className={cn('size-5', gradeColorMap[item.grade])} />
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="space-y-2 p-3">
        <div className="flex justify-between">
          <p className="font-medium">Rate student</p>
          <Button
            size="sm"
            variant={'ghost'}
            onClick={() => handleGradeChange(0)}
          >
            clear
          </Button>
        </div>
        <div className="flex items-center justify-center gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              {item.grade > i && (
                <HiStar
                  className={cn(
                    'size-7 text-primary',
                    gradeColorMap[item.grade]
                  )}
                  onClick={() => handleGradeChange(i + 1)}
                />
              )}
              {item.grade <= i && (
                <HiOutlineStar
                  className="size-7 text-primary"
                  onClick={() => handleGradeChange(i + 1)}
                />
              )}
            </div>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
