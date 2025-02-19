'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  GROUPS_QUERY_KEY,
  STUDENTS_QUERY_KEY,
} from '@/lib/constants/query-keys';
import { GroupService } from '@/services/group.service';

const useGetAllGroups = () => {
  return useQuery({
    queryKey: [GROUPS_QUERY_KEY],
    queryFn: GroupService.getAll,
    select: ({ data }) => data,
  });
};

const useGetGroupById = (id: number) => {
  return useQuery({
    queryKey: [GROUPS_QUERY_KEY, id],
    queryFn: async () => {
      const res = await GroupService.getById(id);
      return res.data;
    },
    enabled: !!id,
  });
};

const useCreateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: GroupService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY] });
      toast.success('Group has been created');
    },
  });
};

const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: GroupService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY] });
      toast.success('Group has been updated');
    },
  });
};

const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: GroupService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY] });
      toast.success('Group has been deleted');
    },
  });
};

const useDeleteGroupWithStudents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: GroupService.deleteWithStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      toast.success('Group has been deleted with its students');
    },
  });
};

export {
  useCreateGroup,
  useDeleteGroup,
  useDeleteGroupWithStudents,
  useGetAllGroups,
  useGetGroupById,
  useUpdateGroup,
};
