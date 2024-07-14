import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  ATTENDANCES_QUERY_KEY,
  LESSONS_QUERY_KEY,
} from '@/lib/constants/query-keys';
import { AttendanceService } from '@/services/attendance.service';

export const useGetStudentSemesterAttendanceStatistics = () => {
  return useQuery({
    queryKey: [ATTENDANCES_QUERY_KEY, 'overall'],
    queryFn: async () => {
      const res =
        await AttendanceService.getStudentSemesterAttendanceStatistics();
      return res.data;
    },
  });
};

export const useGetStudentSemesterAttendanceStatisticsForEachCourse = (
  semesterId?: number
) => {
  return useQuery({
    queryKey: [ATTENDANCES_QUERY_KEY, 'each-course'],
    queryFn: async () => {
      const res =
        await AttendanceService.getStudentSemesterAttendanceForEachSubject({
          semesterId,
        });
      return res.data;
    },
  });
};

export const useGetStudentTodayLessonsStatistics = () => {
  return useQuery({
    queryKey: [LESSONS_QUERY_KEY],
    queryFn: async () => {
      const res = await AttendanceService.getStudentTodayLessonsStatistics();
      return res.data;
    },
  });
};

export const useGetStudentHeatmapStatistics = (semesterId?: number) => {
  return useQuery({
    queryKey: [ATTENDANCES_QUERY_KEY, 'heatmap'],
    queryFn: async () => {
      const res = await AttendanceService.getStudentHeatmapStatistics({
        semesterId,
      });
      return res.data;
    },
  });
};

export const useUpdateAttendance = (lessonId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AttendanceService.update,
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [LESSONS_QUERY_KEY, lessonId],
      });
      queryClient.invalidateQueries({ queryKey: [LESSONS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ATTENDANCES_QUERY_KEY] });
      toast.success(res.data.data.message);
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
