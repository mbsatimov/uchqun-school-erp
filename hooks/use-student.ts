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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      toast.dismiss();
    },
  });
};

const useUpdateStudentGroup = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.updateGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [STUDENTS_QUERY_KEY, { groupId }],
      });
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY] });
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
  });
};

const useUpdateStudentProfileImage = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.updateImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY, id] });
    },
  });
};

const useDeleteStudent = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY, groupId] });
      toast.dismiss();
    },
  });
};

const useDeleteSomeStudents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.deleteSomeById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
    },
  });
};

const useRemoveStudentFromGroup = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.removeFromGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY, groupId] });
    },
  });
};

export const useRemoveSomeStudentsFromGroup = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StudentService.removeSomeFromGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY, groupId] });
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
