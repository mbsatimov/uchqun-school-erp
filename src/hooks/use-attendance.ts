import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  ATTENDANCES_QUERY_KEY,
  LESSONS_QUERY_KEY,
} from '@/lib/constants/query-keys';
import { AttendanceService } from '@/services/attendance.service';

export const useGetStudentSemesterAttendanceStatistics = (
  studentId: number
) => {
  return useQuery({
    queryKey: [ATTENDANCES_QUERY_KEY, 'overall', studentId],
    queryFn: async () => {
      const res =
        await AttendanceService.getStudentSemesterAttendanceStatistics(
          studentId
        );
      return res.data;
    },
  });
};

export const useGetStudentSemesterAttendanceStatisticsForEachCourse = (
  studentId: number,
  semesterId?: number
) => {
  return useQuery({
    queryKey: [ATTENDANCES_QUERY_KEY, 'each-course', studentId],
    queryFn: async () => {
      const res =
        await AttendanceService.getStudentSemesterAttendanceForEachSubject({
          studentId,
          semesterId,
        });
      return res.data;
    },
  });
};

export const useGetStudentTodayLessonsStatistics = (studentId: number) => {
  return useQuery({
    queryKey: [LESSONS_QUERY_KEY, { studentId }],
    queryFn: async () => {
      const res =
        await AttendanceService.getStudentTodayLessonsStatistics(studentId);
      return res.data;
    },
    enabled: !!studentId,
  });
};

export const useGetStudentHeatmapStatistics = (
  studentId: number,
  semesterId?: number
) => {
  return useQuery({
    queryKey: [ATTENDANCES_QUERY_KEY, 'heatmap'],
    queryFn: async () => {
      const res = await AttendanceService.getStudentHeatmapStatistics({
        studentId,
        semesterId,
      });
      return res.data;
    },
  });
};

export const useUpdateAttendance = (lessonId: number, teacherId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AttendanceService.update,
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [LESSONS_QUERY_KEY, lessonId],
      });
      queryClient.invalidateQueries({
        queryKey: [LESSONS_QUERY_KEY, { teacherId }],
      });
      queryClient.invalidateQueries({
        queryKey: [ATTENDANCES_QUERY_KEY, { teacherId }],
      });
      toast.success(res.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};
