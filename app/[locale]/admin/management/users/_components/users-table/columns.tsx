import type { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { phoneFormat } from '@/lib/helpers';

import { UserTableCellMenu } from './user-table-cell-menu';

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
    header: 'Full name',
    cell: ({ row }) => {
      const { name, surname } = row.original;
      return <div>{`${name} ${surname}`}</div>;
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>{row.original.role}</span>
      </div>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone',
    cell: ({ row }) => (
      <div className="whitespace-nowrap font-mono font-medium">
        {phoneFormat(row.original.phoneNumber)}
      </div>
    ),
  },
  {
    accessorKey: 'payment',
    header: 'Payment',
    cell: ({ row }) => {
      if (row.original.role === 'STUDENT') {
        return (
          <div className="flex w-[100px] items-center">
            {/* <span>{row.original.payment}</span> */}
          </div>
        );
      }
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <UserTableCellMenu user={row.original} />,
  },
];
