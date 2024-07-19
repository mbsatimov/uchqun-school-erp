'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { COURSES_QUERY_KEY } from '@/lib/constants/query-keys';
import { CourseService } from '@/services/course.service';

export const useGetAllCourses = () => {
  return useQuery({
    queryKey: [COURSES_QUERY_KEY],
    queryFn: CourseService.getAll,
    select: ({ data }) => data,
  });
};

export const useGetCourseById = (id: number) => {
  return useQuery({
    queryKey: [COURSES_QUERY_KEY, id],
    queryFn: async () => {
      const res = await CourseService.getById(id);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CourseService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSES_QUERY_KEY] });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CourseService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSES_QUERY_KEY] });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CourseService.deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSES_QUERY_KEY] });
    },
  });
};

export const useDeleteSomeCourses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CourseService.deleteSomeById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSES_QUERY_KEY] });
    },
  });
};
