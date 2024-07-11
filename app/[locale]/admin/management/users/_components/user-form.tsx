'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { PhoneInput } from '@/components/ui/phone-input';
import type { TCreateUserSchema } from '@/lib/validators';
import { CreateUserSchema } from '@/lib/validators/admin';
import { usePostUsersMutation, usePutUsersIdMutation } from '@/utils/api';

interface UserFormProps {
  role: Role;
  user?: User;
}

export const UserForm: React.FC<UserFormProps> = ({ role, user }) => {
  const form = useForm<TCreateUserSchema>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: user
      ? {
          name: user.name,
          surname: user.surname,
          phoneNumber: user.phoneNumber,
        }
      : {
          name: '',
          surname: '',
          phoneNumber: '',
          password: '',
        },
    mode: 'onTouched',
  });

  const postUsersMutation = usePostUsersMutation();
  const putUserMutation = usePutUsersIdMutation();

  function onSubmit(studentData: TCreateUserSchema) {
    user
      ? putUserMutation
          .mutateAsync({
            id: user.id,
            data: { ...studentData, role },
          })
          .then(() => form.reset())
      : postUsersMutation
          .mutateAsync({ data: { ...studentData, role } })
          .then(() => form.reset());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input placeholder="Surname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <PhoneInput placeholder="Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type="submit"
            disabled={postUsersMutation.isPending || putUserMutation.isPending}
            isLoading={postUsersMutation.isPending || putUserMutation.isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
