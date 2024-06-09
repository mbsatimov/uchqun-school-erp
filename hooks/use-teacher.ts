'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TEACHERS_QUERY_KEY } from '@/lib/constants/query-keys';
import { TeacherService } from '@/services/teacher.service';

const useGetAllTeachers = () => {
  return useQuery({
    queryKey: [TEACHERS_QUERY_KEY],
    queryFn: TeacherService.getAll,
    select: ({ data }) => data,
  });
};

const useGetTeacherById = (id: number) => {
  return useQuery({
    queryKey: [TEACHERS_QUERY_KEY, id],
    queryFn: async () => {
      const res = await TeacherService.getById(id);
      return res.data;
    },
    enabled: !!id,
  });
};

const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TeacherService.create,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [TEACHERS_QUERY_KEY] });
      toast.success(res.data.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

const useUpdateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TeacherService.update,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [TEACHERS_QUERY_KEY] });
      toast.success(res.data.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TeacherService.deleteById,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [TEACHERS_QUERY_KEY] });
      toast.success(res.data.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

const useDeleteSomeTeachers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TeacherService.deleteSomeById,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [TEACHERS_QUERY_KEY] });
      toast.success(res.data.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

export {
  useCreateTeacher,
  useDeleteSomeTeachers,
  useDeleteTeacher,
  useGetAllTeachers,
  useGetTeacherById,
  useUpdateTeacher,
};
