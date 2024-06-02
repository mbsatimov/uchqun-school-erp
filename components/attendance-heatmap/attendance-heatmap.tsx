// AttendanceHeatmap Component
import React from 'react';

import Loading from '@/app/[locale]/loading';
import { useGetStudentHeatmapStatistics } from '@/hooks/use-attendance';
import { getCurrentUser } from '@/lib/auth.helper';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { getMonths } from '@/lib/helpers';

import type { IAttendanceRecord } from './heatmap.interface';
import { MonthGrid } from './month-grid';

export const AttendanceHeatmap: React.FC = () => {
  const heatmapStatistics = useGetStudentHeatmapStatistics(getCurrentUser().id);

  if (heatmapStatistics.isLoading) return <Loading />;

  if (heatmapStatistics.isError) throw new DefaultError();

  const monthlyData = getMonths(new Date());

  return (
    <div className="flex gap-2 overflow-x-auto">
      {monthlyData.map((month, index) => (
        <MonthGrid
          key={index}
          month={new Date(month)}
          data={heatmapStatistics.data || ({} as IAttendanceRecord)}
        />
      ))}
    </div>
  );
};
