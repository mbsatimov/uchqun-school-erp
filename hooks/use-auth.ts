'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { AuthService } from '@/services/auth.service';

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: res => {
      toast.success('You have successfully logged in! 😏');

      const userRole = res.data.user.role.toLowerCase();

      router.push(`/${userRole}/profile`);
    },
  });
};

export const useLogout = () => {
  return AuthService.logout;
};
