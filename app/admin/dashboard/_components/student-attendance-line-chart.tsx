'use client';

import { format } from 'date-fns';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useConfig } from '@/hooks/use-config';
import { themes } from '@/styles/themes';
import type { IOverallAttendance } from '@/app/admin/dashboard/_types/dashboard.interface';

interface StudentAttendanceLineChartProps {
  data: Array<IOverallAttendance>;
}

export const StudentAttendanceLineChart: React.FC<
  StudentAttendanceLineChartProps
> = ({ data: overallAttendance }) => {
  const [data, setData] = useState(overallAttendance);
  const { theme: mode } = useTheme();
  const [config] = useConfig();
  const theme = themes.find(theme => theme.name === config.theme);

  useEffect(() => {
    setData(
      overallAttendance?.map(attendance => ({
        ...attendance,
        date: format(new Date(attendance.date), 'MMM d'),
      }))
    );
  }, [overallAttendance]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <XAxis
          dataKey="date"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          padding={{ left: 30, right: 30 }}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          padding={{ top: 10, bottom: 10 }}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Total
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].value}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        present
                      </span>
                      <span className="font-bold">{payload[1].value}</span>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="total"
          activeDot={{
            r: 6,
            style: { fill: 'var(--theme-primary)', opacity: 0.25 },
          }}
          style={
            {
              stroke: 'var(--theme-primary)',
              opacity: 0.25,
              '--theme-primary': `hsl(${
                theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary
              })`,
            } as React.CSSProperties
          }
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="present"
          activeDot={{
            r: 8,
            style: { fill: 'var(--theme-primary)' },
          }}
          style={
            {
              stroke: 'var(--theme-primary)',
              '--theme-primary': `hsl(${
                theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary
              })`,
            } as React.CSSProperties
          }
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
