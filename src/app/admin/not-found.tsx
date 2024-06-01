import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import R from '@/lib/config/routes';
import { SUPPORT_BOT_URL } from '@/lib/constants/constants';
import { cn } from '@/lib/utils';

function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center space-y-5 rounded-md border bg-accent/50 p-6 backdrop-blur-md sm:p-14 md:max-w-[700px] md:p-20">
        <h1 className="text-7xl font-extrabold md:text-9xl">404</h1>
        <h2 className="text-center text-2xl font-bold uppercase md:text-3xl">
          Opps! page not found
        </h2>
        <p className="text-center">
          Sorry, the page you are looking for doesn&apos;t exist. If you think
          something is broken, report a problem.
        </p>
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            className={cn('uppercase', buttonVariants({ variant: 'default' }))}
            href={R.HOME}
          >
            back to home page
          </Link>
          <Link
            className={cn('uppercase', buttonVariants({ variant: 'outline' }))}
            href={SUPPORT_BOT_URL}
          >
            report a problem
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
