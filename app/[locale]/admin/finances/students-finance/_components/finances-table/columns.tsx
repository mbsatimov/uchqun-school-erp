import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import {
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui';

export const columns: Array<ColumnDef<Finance>> = [
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
    accessorKey: 'firstName',
    header: 'Full name',
    cell: ({ row }) => {
      const fullName =
        row.original.student.name + ' ' + row.original.student.surname;
      return <div className="whitespace-nowrap">{fullName}</div>;
    },
  },
  {
    accessorKey: 'studentStatus',
    header: 'Student status',
    cell: ({ row }) => {
      return row.original.student.phoneNumber;
    },
  },
  {
    accessorKey: 'contractStatus',
    header: 'Contract status',
    cell: ({ row }) => {
      return row.original.contractStatus;
    },
  },
  {
    accessorKey: 'paymentPlan',
    header: 'Payment plan',
    cell: ({ row }) => {
      if (!row.original.paymentPlan)
        return (
          <Badge variant={'secondary'} className="cursor-pointer">
            Add plan
          </Badge>
        );
      return (
        <Badge className="whitespace-nowrap font-mono font-medium">
          {row.original.paymentPlan.name}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    maxSize: 10,
    cell: () => {
      return (
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[150px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
