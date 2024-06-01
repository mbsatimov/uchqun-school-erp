'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { SEMESTERS_QUERY_KEY } from '@/lib/constants/query-keys';
import { SemesterService } from '@/services/semester.service';

export const useGetAllGlobalSemesters = () => {
  return useQuery({
    queryKey: [SEMESTERS_QUERY_KEY],
    queryFn: async () => {
      const res = await SemesterService.getAllGlobal();
      return res.data;
    },
  });
};

export const useGetByIdGlobalSemester = (id: number) => {
  return useQuery({
    queryKey: [SEMESTERS_QUERY_KEY, id],
    queryFn: async () => {
      const res = await SemesterService.getByIdGlobal(id);
      return res.data;
    },
  });
};

export const useGetAllSemestersByGroupId = (groupId: number) => {
  return useQuery({
    queryKey: [SEMESTERS_QUERY_KEY, { groupId: groupId }],
    queryFn: async () => {
      const res = await SemesterService.getAllByGroupId(groupId);
      return res.data;
    },
    enabled: !!groupId,
  });
};

export const useGetCurrentSemesterByGroupId = (groupId: number) => {
  return useQuery({
    queryKey: [SEMESTERS_QUERY_KEY, { groupId: groupId }],
    queryFn: async () => {
      const res = await SemesterService.getCurrent(groupId);
      return res.data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!groupId,
  });
};

export const useGetStudentCurrentSemester = (studentId: number) => {
  return useQuery({
    queryKey: [SEMESTERS_QUERY_KEY, { studentId: studentId }],
    queryFn: async () => {
      const res = await SemesterService.getStudentCurrent(studentId);
      return res.data;
    },
    enabled: !!studentId,
  });
};

export const useGetSemesterById = (semesterId: number) => {
  return useQuery({
    queryKey: [SEMESTERS_QUERY_KEY, semesterId],
    queryFn: async () => {
      const res = await SemesterService.getById(semesterId);
      return res.data;
    },
    enabled: !!semesterId,
  });
};

export const useCreateSemester = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SemesterService.create,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [SEMESTERS_QUERY_KEY] });
      toast.success(res.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

export const useGenerateTimeTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SemesterService.generateTimeTable,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [SEMESTERS_QUERY_KEY] });
      toast.success(res.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

export const useUpdateSemester = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SemesterService.update,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [SEMESTERS_QUERY_KEY] });
      toast.success(res.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

export const useDeleteSemester = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SemesterService.delete,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [SEMESTERS_QUERY_KEY] });
      toast.success(res.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};
