'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  GROUPS_QUERY_KEY,
  STUDENTS_QUERY_KEY,
} from '@/lib/constants/query-keys';
import { StudentService } from '@/services/student.service';

const useGetAllStudents = () => {
  return useQuery({
    queryKey: [STUDENTS_QUERY_KEY],
    queryFn: StudentService.getAll,
    select: ({ data }) => data,
  });
};

const useGetStudentById = (id: number) => {
  return useQuery({
    queryKey: [STUDENTS_QUERY_KEY, id],
    queryFn: async () => {
      const res = await StudentService.getById(id);
      return res.data;
    },
    enabled: !!id,
  });
};

const useGetAllStudentsByGroupId = (id: number | null | undefined) => {
  return useQuery({
    queryKey: [STUDENTS_QUERY_KEY, { groupId: id }],
    queryFn: async () => {
      if (!id) return;
      const res = await StudentService.getAllByGroupId(id);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useGetStudentAttendanceOverview = (id: number) => {
  return useQuery({
    queryKey: [STUDENTS_QUERY_KEY, 'attendance-overview', id],
    queryFn: async () => {
      const res = await StudentService.getAttendanceOverview(id);
      return res.data;
    },
    enabled: !!id,
  });
};

const useCreateStudentByFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.createByFile,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      toast.success(res.data.data.message);
    },
    onError: err => {
      toast.dismiss();
      toast.error(err.message);
    },
  });
};

const useUpdateStudent = (id: number, student: IUpdateStudentRequest) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      toast.loading('Updating student...');
      const res = await StudentService.update(id, student);
      return res.data;
    },
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      toast.dismiss();
      toast.success(res.data.message);
    },
    onError: err => {
      toast.dismiss();
      toast.error(err.message);
    },
  });
};

const useUpdateStudentGroup = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.updateGroup,
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [STUDENTS_QUERY_KEY, { groupId }],
      });
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY] });
      toast.success(res.data.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

export const useUpdateSomeStudentsGroup = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.updateSomeGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY, groupId] });
      toast.success('Students have been added to this group');
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

const useUpdateStudentProfileImage = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.updateImage,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY, id] });
      toast.success(res.data.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

const useDeleteStudent = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.deleteById,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY, groupId] });
      toast.dismiss();
      toast.success(res.data.data.message);
    },
    onError: err => {
      toast.dismiss();
      toast.error(err.message);
    },
  });
};

const useDeleteSomeStudents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.deleteSomeById,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      toast.success(res.data.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

const useRemoveStudentFromGroup = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.removeFromGroup,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY, groupId] });
      toast.success(res.data.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

export const useRemoveSomeStudentsFromGroup = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.removeSomeFromGroup,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY, groupId] });
      toast.success(res.data.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

export {
  useCreateStudentByFile,
  useDeleteSomeStudents,
  useDeleteStudent,
  useGetAllStudents,
  useGetAllStudentsByGroupId,
  useGetStudentById,
  useRemoveStudentFromGroup,
  useUpdateStudent,
  useUpdateStudentGroup,
  useUpdateStudentProfileImage,
};
