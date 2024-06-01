'use client';

import { Eye } from 'lucide-react';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { ILoginRequest } from '@/types/auth.interface';

interface PasswordFieldProps {
  form: UseFormReturn<ILoginRequest>;
}

export const FieldPassword: React.FC<PasswordFieldProps> = ({ form }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div className="group relative">
              <Input
                placeholder="Password"
                {...field}
                type={showPassword ? 'text' : 'password'}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="invisible absolute right-1 top-1/2 -translate-y-1/2 group-hover:visible"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Eye size={18} />
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
