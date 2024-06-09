'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  LESSONS_QUERY_KEY,
  SEMESTERS_QUERY_KEY,
} from '@/lib/constants/query-keys';
import { LessonService } from '@/services/lesson.service';

export const useGetLessonById = (id: number) => {
  return useQuery({
    queryKey: [LESSONS_QUERY_KEY, id],
    queryFn: async () => {
      const res = await LessonService.getById(id);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useGetTeacherTodayLessons = () => {
  return useQuery({
    queryKey: [LESSONS_QUERY_KEY, { teacherId: 'today' }],
    queryFn: async () => {
      const res = await LessonService.getTeacherTodayLessons();
      return res.data;
    },
  });
};

export const useGetLessonsByDailyScheduleId = (dailyScheduleId: number) => {
  return useQuery({
    queryKey: [LESSONS_QUERY_KEY, { dailyScheduleId }],
    queryFn: async () => {
      const res =
        await LessonService.getLessonsByDailyScheduleId(dailyScheduleId);
      return res.data;
    },
    enabled: !!dailyScheduleId,
  });
};

export const useCreateLesson = (dailyScheduleId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LessonService.create,
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [LESSONS_QUERY_KEY, { dailyScheduleId }],
      });
      queryClient.invalidateQueries({ queryKey: [SEMESTERS_QUERY_KEY] });
      toast.success(res.data.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

export const useDeleteLesson = (dailyScheduleId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LessonService.delete,
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [LESSONS_QUERY_KEY, { dailyScheduleId }],
      });
      queryClient.invalidateQueries({ queryKey: [SEMESTERS_QUERY_KEY] });
      toast.success(res.data.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};
