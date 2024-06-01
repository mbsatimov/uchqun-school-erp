'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useLogin } from '@/hooks/use-auth';
import type { TLoginWithPhoneSchema } from '@/lib/validators/login-with-phone-schema';
import { LoginWithPhoneSchema } from '@/lib/validators/login-with-phone-schema';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';

import { FieldPassword } from './field-password';
import { FieldPhone } from './field-phone';

export const LoginWithPhoneForm = () => {
  const login = useLogin();
  const form = useForm<TLoginWithPhoneSchema>({
    resolver: zodResolver(LoginWithPhoneSchema),
    mode: 'onTouched',
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const handleSubmit = (data: TLoginWithPhoneSchema) => {
    login.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Login with Phone</CardTitle>
            <CardDescription>
              Enter your phone number and password. Click login when you`re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FieldPhone form={form} />
            <FieldPassword form={form} />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={login.isPending}
              isLoading={login.isPending}
              className="ml-auto"
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
