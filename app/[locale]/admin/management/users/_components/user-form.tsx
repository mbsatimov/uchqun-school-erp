'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  DialogFooter,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PasswordInput,
  PhoneInput,
} from '@/components/ui';
import { useCreateUser } from '@/hooks/use-user';
import type { TCreateUserSchema } from '@/lib/validators';
import { CreateUserSchema } from '@/lib/validators/admin';
import type { EnumRole } from '@/types/user.interface';

interface UserFormProps {
  role: EnumRole;
}

export const UserForm: React.FC<UserFormProps> = ({ role }) => {
  const createUser = useCreateUser(role);

  const form = useForm<TCreateUserSchema>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: '',
      surname: '',
      phoneNumber: '',
      password: '',
    },
    mode: 'onTouched',
  });

  function onSubmit(studentData: TCreateUserSchema) {
    createUser.mutate({ ...studentData, role });
  }

  useEffect(() => {
    form.reset();
  }, [createUser.isSuccess, form]);

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
            disabled={createUser.isPending}
            isLoading={createUser.isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
