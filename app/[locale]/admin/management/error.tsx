'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { SUPPORT_BOT_URL } from '@/lib/constants/constants';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex w-full flex-col items-center justify-center pt-8">
      <div className="flex w-full flex-col items-center space-y-5 rounded-md border bg-accent/50 p-6 backdrop-blur-md sm:p-14 md:max-w-[700px] md:p-20">
        <h1 className="text-7xl font-extrabold md:text-9xl">500</h1>
        <h2 className="text-center text-2xl font-bold uppercase md:text-3xl">
          Opps! Something went wrong
        </h2>
        <p className="text-center">
          Sorry, the request could not be processed. If you think something is
          broken, report a problem.
        </p>
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            className="uppercase"
            variant="outline"
            onClick={() => reset()}
          >
            Try again
          </Button>
          <Link
            className={cn('uppercase', buttonVariants({ variant: 'default' }))}
            href={SUPPORT_BOT_URL}
          >
            report a problem
          </Link>
        </div>
      </div>
    </div>
  );
}
