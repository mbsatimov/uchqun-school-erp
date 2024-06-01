'use client';

import type { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { ILoginRequest } from '@/types/auth.interface';

interface PhoneFieldProps {
  form: UseFormReturn<ILoginRequest>;
}

export const FieldPhone: React.FC<PhoneFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="login"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Phone number</FormLabel>
          <FormControl>
            <Input placeholder="Phone number" type="tel" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
