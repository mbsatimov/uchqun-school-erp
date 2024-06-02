import { Eye } from 'lucide-react';
import * as React from 'react';

import { Button } from './button';
import { Input, InputProps } from './input';

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="group relative">
        <Input ref={ref} type={showPassword ? 'text' : 'password'} {...props} />
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
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
