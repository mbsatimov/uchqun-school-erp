'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogout } from '@/hooks/use-auth';
import { useGetUserById } from '@/hooks/use-user';
import { getCurrentUser } from '@/lib/auth.helper';

interface HeaderMenuProps {
  profileLink: string;
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ profileLink }) => {
  const t = useTranslations();
  const user = useGetUserById(getCurrentUser().id, getCurrentUser().role);
  const logout = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar>
          <AvatarImage src={user.data?.attachment?.url} alt={user.data?.name} />
          <AvatarFallback>
            {user.data?.name?.charAt(0)}
            {user.data?.surname?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.data?.attachment?.url}
              alt={user.data?.name}
            />
            <AvatarFallback>
              {user.data?.name?.charAt(0)}
              {user.data?.surname?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="truncate font-medium">
            {user.data?.name} {user.data?.surname}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={profileLink}>
          <DropdownMenuItem>{t('header.menu.links.profile')}</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={logout} className="text-destructive">
          {t('header.menu.links.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
