import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ADMINS_QUERY_KEY } from '@/lib/constants/query-keys';
import { AdminService } from '@/services/admin.service';

export const useGetAllAdmins = () => {
  return useQuery({
    queryKey: [ADMINS_QUERY_KEY],
    queryFn: AdminService.getAll,
    select: ({ data }) => data,
  });
};

export const useGetAdminById = (id: number) => {
  return useQuery({
    queryKey: [ADMINS_QUERY_KEY, id],
    queryFn: async () => {
      const res = await AdminService.getById(id);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminService.create,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [ADMINS_QUERY_KEY] });
      toast.success(res.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminService.deleteById,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [ADMINS_QUERY_KEY] });
      toast.success(res.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};

export const useDeleteSomeAdmins = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminService.deleteSomeById,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: [ADMINS_QUERY_KEY] });
      toast.success(res.data.message);
    },
    onError: err => {
      toast.error(err.message);
    },
  });
};
