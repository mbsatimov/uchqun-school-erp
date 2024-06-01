import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  'rounded-md flex w-full file:border-0 file:bg-transparent file:text-sm file:font-medium ',
  {
    variants: {
      variant: {
        default:
          'border border-input bg-background/50 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        ghost:
          'outline-none bg-transparent hover:bg-background/30 focus:bg-background/50',
      },
      size: {
        default: 'h-10 px-3 py-2 text-sm',
        sm: 'h-8 px-3 text-sm',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
