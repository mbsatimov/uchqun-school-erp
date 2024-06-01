'use client';
import { LoginWithEmailForm } from '@/app/auth/login/_components/login-with-email-form';
import { LoginWithPhoneForm } from '@/app/auth/login/_components/login-with-phone-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const SelectLoginType = () => {
  return (
    <Tabs defaultValue="email" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="email">Email</TabsTrigger>
        <TabsTrigger value="phone">Phone</TabsTrigger>
      </TabsList>
      <TabsContent value="email">
        <LoginWithEmailForm />
      </TabsContent>
      <TabsContent value="phone">
        <LoginWithPhoneForm />
      </TabsContent>
    </Tabs>
  );
};
