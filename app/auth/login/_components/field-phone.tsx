'use client';

import type { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input';
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
            <PhoneInput placeholder="Phone number" type="tel" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
