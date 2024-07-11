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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { PhoneInput } from '@/components/ui/phone-input';
import { useLogin } from '@/hooks/use-auth';
import {
  LoginWithPhoneSchema,
  type TLoginWithPhoneSchema,
} from '@/lib/validators';

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
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login with Phone</CardTitle>
            <CardDescription>
              Enter your phone number and password. Click login when you`re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="Phone number"
                      type="tel"
                      {...field}
                    />
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
