import type { FC } from 'react';

import { cn } from '@/lib/utils';

interface MaxWidthWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MaxWidthWrapper: FC<MaxWidthWrapperProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'mx-auto h-full max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
