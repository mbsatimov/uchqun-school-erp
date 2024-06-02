'use client';
import { Cell, Pie, PieChart } from 'recharts';

import type { IAttendanceOverview } from '@/types/attendance.interface';

interface AttPieChartProps {
  data: IAttendanceOverview;
}

export const AttPieChart: React.FC<AttPieChartProps> = ({ data }) => {
  return (
    <div className="relative">
      <PieChart width={160} height={160}>
        <Pie
          data={[data?.present, data?.late, data?.absent, data?.excused].map(
            item => ({
              value: item,
            })
          )}
          cx={'50%'}
          cy={'50%'}
          innerRadius={60}
          outerRadius={70}
          paddingAngle={5}
          dataKey="value"
          cornerRadius={5}
        >
          <Cell strokeOpacity={0} fill={'hsl(var(--present))'} />
          <Cell strokeOpacity={0} fill={'hsl(var(--late))'} />
          <Cell strokeOpacity={0} fill={'hsl(var(--absent))'} />
          <Cell strokeOpacity={0} fill={'hsl(var(--excused))'} />
        </Pie>
      </PieChart>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
        {data ? data.percentage + '%' : null}
      </div>
    </div>
  );
};
