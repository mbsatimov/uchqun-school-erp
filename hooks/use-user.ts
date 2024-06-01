import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  ADMINS_QUERY_KEY,
  STUDENTS_QUERY_KEY,
  TEACHERS_QUERY_KEY,
  USERS_QUERY_KEY,
} from '@/lib/constants/query-keys';
import { UserService } from '@/services/user.service';
import { EnumRole } from '@/types/user.interface';

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: [USERS_QUERY_KEY],
    queryFn: UserService.getAll,
    select: ({ data }) => data,
  });
};

export const useGetUserById = (id: number, role: EnumRole) => {
  return useQuery({
    queryKey: [USERS_QUERY_KEY, id],
    queryFn: async () => {
      const res = await UserService.getById(id, role);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateUser = (role: EnumRole) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.create,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      if (role === EnumRole.STUDENT) {
        queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      } else if (role === EnumRole.TEACHER) {
        queryClient.invalidateQueries({ queryKey: [TEACHERS_QUERY_KEY] });
      } else if (role === EnumRole.ADMIN) {
        queryClient.invalidateQueries({ queryKey: [ADMINS_QUERY_KEY] });
      }
      toast.success(res.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

export const useCreateUserByFile = (role: EnumRole) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.createByFile,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      if (role === EnumRole.STUDENT) {
        queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      } else if (role === EnumRole.TEACHER) {
        queryClient.invalidateQueries({ queryKey: [TEACHERS_QUERY_KEY] });
      } else if (role === EnumRole.ADMIN) {
        queryClient.invalidateQueries({ queryKey: [ADMINS_QUERY_KEY] });
      }
      toast.success(res.data.message);
    },
    onError: err => {
      toast.dismiss();
      toast.error(err.message);
    },
  });
};

export const useUpdateUserProfileImage = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.updateProfileImage,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY, id] });
      toast.success(res.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

export const useDeleteSomeUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.deleteSomeById,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [TEACHERS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ADMINS_QUERY_KEY] });
      toast.success(res.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

export const useDeleteUserProfileImage = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.deleteProfileImage,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY, id] });
      toast.success(res.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};
