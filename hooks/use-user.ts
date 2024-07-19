import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  ADMINS_QUERY_KEY,
  STUDENTS_QUERY_KEY,
  TEACHERS_QUERY_KEY,
  USERS_QUERY_KEY,
} from '@/lib/constants/query-keys';
import { UserService } from '@/services/user.service';

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: [USERS_QUERY_KEY],
    queryFn: UserService.getAll,
    select: ({ data }) => data,
  });
};

export const useGetUserById = (id: number, role: Role) => {
  return useQuery({
    queryKey: [USERS_QUERY_KEY, id],
    queryFn: async () => {
      const res = await UserService.getById(id, role);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateUser = (role: Role) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      if (role === 'STUDENT') {
        queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      } else if (role === 'TEACHER') {
        queryClient.invalidateQueries({ queryKey: [TEACHERS_QUERY_KEY] });
      } else if (role === 'ADMIN') {
        queryClient.invalidateQueries({ queryKey: [ADMINS_QUERY_KEY] });
      }
    },
  });
};

export const useCreateUserByFile = (role: Role) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.createByFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      if (role === 'STUDENT') {
        queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      } else if (role === 'TEACHER') {
        queryClient.invalidateQueries({ queryKey: [TEACHERS_QUERY_KEY] });
      } else if (role === 'ADMIN') {
        queryClient.invalidateQueries({ queryKey: [ADMINS_QUERY_KEY] });
      }
    },
  });
};

export const useUpdateUserProfileImage = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.updateProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY, id] });
    },
  });
};

export const useDeleteSomeUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.deleteSomeById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [TEACHERS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ADMINS_QUERY_KEY] });
    },
  });
};

export const useDeleteUserProfileImage = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.deleteProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY, id] });
    },
  });
};
