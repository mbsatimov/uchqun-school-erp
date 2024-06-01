import React from 'react';

import type { IAttendanceOverview } from '@/types/attendance.interface';

import { AttBarChartItem } from './att-bar-chart-item';

interface AttBarChartProps {
  data: IAttendanceOverview;
}

export const AttBarChart: React.FC<AttBarChartProps> = ({ data }) => {
  return (
    <ul className="w-full flex-1 space-y-2 text-sm">
      <AttBarChartItem
        status={'PRESENT'}
        value={data.present}
        indicatorClassName="bg-present"
        allLessonsCount={data.present + data.late + data.absent + data.excused}
      />
      <AttBarChartItem
        status={'LATE'}
        value={data.late}
        indicatorClassName="bg-late"
        allLessonsCount={data.present + data.late + data.absent + data.excused}
      />
      <AttBarChartItem
        status={'ABSENT'}
        value={data.absent}
        indicatorClassName="bg-absent"
        allLessonsCount={data.present + data.late + data.absent + data.excused}
      />
      <AttBarChartItem
        status={'EXCUSED'}
        value={data.excused}
        indicatorClassName="bg-excused"
        allLessonsCount={data.present + data.late + data.absent + data.excused}
      />
    </ul>
  );
};
