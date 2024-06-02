'use client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

import { useGetGroupById } from '@/hooks/use-group';
import R from '@/lib/config/routes';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { GroupTabs } from './group-navigation';

interface GroupHeaderProps {
  groupId: number;
}

export const GroupHeader: FC<GroupHeaderProps> = ({ groupId }) => {
  const group = useGetGroupById(groupId);

  if (group.isError) throw new DefaultError();

  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <Link
          href={R.ADMIN_GROUPS}
          className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
        >
          <ArrowLeft size={24} />
        </Link>
        {group.isLoading ? (
          <>
            <Skeleton className="h-8 w-32" />
          </>
        ) : (
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {group.data?.name}
          </h2>
        )}
      </div>
      <GroupTabs />
    </>
  );
};
