import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { attendanceStatusColorsMap } from '@/lib/constants/attendanceStatusColorMap';
import { phoneFormat } from '@/lib/helpers';

import { statuses } from './data';

export const columns: Array<ColumnDef<StudentAttendance>> = [
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
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">
          {format(row.original.date, 'dd MMM yyyy')}
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Full name',
    cell: ({ row }) => {
      const { name, surname } = row.original;
      const fullName = `${name} ${surname}`;

      return <div className="whitespace-nowrap">{fullName}</div>;
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone',
    cell: ({ row }) => {
      const phoneNumber: string = row.getValue('phoneNumber');

      // Format the phone as a phone number
      const formatted = phoneFormat(phoneNumber);

      return (
        <div className="whitespace-nowrap font-mono font-medium">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = statuses.find(
        status => status.value === row.original.status
      );

      if (!status) {
        return null;
      }

      return (
        <Badge className={attendanceStatusColorsMap[status.value]}>
          {status.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'grade',
    header: 'Grade',
    cell: ({ row }) => {
      return <div>{row.original.grade}</div>;
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
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
            {/* <DeleteUserMenuItem id={user.id} role={user.role} /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
