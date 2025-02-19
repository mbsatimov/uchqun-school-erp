import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { type FC } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteSomeUsers } from '@/hooks/use-user';

import { UserTableColumnHeader } from './header-table';

const DeleteUserMenuItem: FC<{ id: number; role: Role }> = ({ id, role }) => {
  const deleteUserMutation = useDeleteSomeUsers();

  const handleDeleteUser = () => {
    deleteUserMutation.mutate([{ id, role }]);
  };

  return (
    <DropdownMenuItem className="text-red-600" onClick={handleDeleteUser}>
      Delete
    </DropdownMenuItem>
  );
};

export const columns: Array<ColumnDef<User>> = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[3px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[3px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <UserTableColumnHeader column={column} title="Full name" />
    ),
    cell: ({ row }) => {
      const { name, surname } = row.original;
      const fullName = `${name} ${surname}`;

      return <div>{fullName}</div>;
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <UserTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      const phoneNumber: string = row.getValue('phoneNumber');

      // Format the phone as a phone number
      const formatted = `${phoneNumber.substring(
        0,
        4
      )} (${phoneNumber.substring(4, 6)}) ${phoneNumber.substring(
        6,
        9
      )}-${phoneNumber.substring(9, 11)}-${phoneNumber.substring(11, 13)}`;

      return (
        <div className="whitespace-nowrap font-mono font-medium">
          {formatted}
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[150px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.phoneNumber)}
            >
              Copy phone
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DeleteUserMenuItem id={user.id} role={user.role} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
