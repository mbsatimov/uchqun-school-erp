'use client';

import {
  useGetStudentSemesterAttendanceStatistics,
  useGetStudentSemesterAttendanceStatisticsForEachCourse,
} from '@/hooks/use-attendance';
import { getCurrentUser } from '@/lib/auth.helper';
import { DefaultError } from '@/lib/exceptions/default-exception';
import type { ICourseAttendanceOverview } from '@/types/attendance.interface';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

import { CardDailyAttendance } from './daily-attendance/card-daily-attendance';
import { CardAttOverview } from './overall-attendance/card-att-overview';

const defaultData: ICourseAttendanceOverview = {
  Overall: {
    present: 0,
    absent: 0,
    late: 0,
    excused: 0,
    percentage: 0,
  },
};

export const StudentAttendanceBlock = () => {
  const overallAttendance = useGetStudentSemesterAttendanceStatistics(
    getCurrentUser().id
  );
  const attendanceForEachCourse =
    useGetStudentSemesterAttendanceStatisticsForEachCourse(getCurrentUser().id);

  if (overallAttendance.isError || attendanceForEachCourse.isError)
    throw new DefaultError();

  if (overallAttendance.isLoading || attendanceForEachCourse.isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Attendance</h2>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
        <Skeleton className="h-[250px] w-full" />
        <Skeleton className="h-[250px] w-full" />
      </div>
    );
  }

  const data = Object.keys(
    { ...attendanceForEachCourse.data, Overall: overallAttendance.data } ||
      defaultData
  );

  return (
    <Tabs defaultValue="Overall" className="space-y-2">
      <h2 className="text-xl font-bold">Attendance</h2>
      <TabsList className="justify-start gap-2 bg-transparent">
        {data.map(course => (
          <TabsTrigger key={course} value={course} className="bg-muted/50">
            {course}
          </TabsTrigger>
        ))}
      </TabsList>
      {data.map(course => (
        <TabsContent key={course} value={course} className="space-y-4">
          <CardAttOverview
            courseName={course}
            data={
              {
                ...attendanceForEachCourse.data,
                Overall: overallAttendance.data,
              }?.[course] || defaultData.Overall
            }
          />
          <CardDailyAttendance />
        </TabsContent>
      ))}
    </Tabs>
  );
};
