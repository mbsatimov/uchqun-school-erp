'use client';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { Progress } from '@/components/ui/progress';
interface AttBarChartItemProps {
  status: AttendanceStatus;
  value: number;
  indicatorClassName?: string;
  allLessonsCount: number;
}

export const AttBarChartItem: FC<AttBarChartItemProps> = ({
  status,
  value,
  indicatorClassName,
  allLessonsCount,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress((value / allLessonsCount) * 100);
  }, [value, allLessonsCount]);

  return (
    <li className="space-y-1">
      <span>
        {status}: {value}
      </span>
      <Progress
        className="h-2"
        value={progress}
        indicatorClassName={indicatorClassName}
      />
    </li>
  );
};
