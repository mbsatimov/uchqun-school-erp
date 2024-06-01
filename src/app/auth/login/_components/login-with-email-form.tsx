'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { useLogin } from '@/hooks/use-auth';
import type { TLoginWithEmailSchema } from '@/lib/validators/login-with-email-schema';
import { LoginWithEmailSchema } from '@/lib/validators/login-with-email-schema';

import { FieldEmail } from './field-email';
import { FieldPassword } from './field-password';

export const LoginWithEmailForm = () => {
  const login = useLogin();
  const form = useForm<TLoginWithEmailSchema>({
    resolver: zodResolver(LoginWithEmailSchema),
    mode: 'onTouched',
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const handleSubmit = (data: TLoginWithEmailSchema) => {
    login.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Login with Email</CardTitle>
            <CardDescription>
              Enter your email and password. Click login when you`re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FieldEmail form={form} />
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
