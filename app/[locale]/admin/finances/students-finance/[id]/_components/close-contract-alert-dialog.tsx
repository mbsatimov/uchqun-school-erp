'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  GET_STUDENT_FIANCES_QUERY_KEY,
  usePostStudentFinancesIdCloseMutation,
} from '@/utils/api';

type Props = {
  studentFinanceId: number;
  contractStatus: ContractStatus;
};

export const CloseContractAlertDialog = ({
  studentFinanceId,
  contractStatus,
}: Props) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const postStudentFinancesIdClose = usePostStudentFinancesIdCloseMutation({
    options: {
      onSuccess: () => {
        toast.success('Contract closed');
        queryClient.invalidateQueries({
          queryKey: [GET_STUDENT_FIANCES_QUERY_KEY],
        });
      },
    },
  });

  const onSubmit = async () => {
    await postStudentFinancesIdClose.mutateAsync({ id: studentFinanceId });
    setOpen(false);
  };

  if (contractStatus === 'CLOSED') return null;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Close Contract</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will close contract for this
            student.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={onSubmit}
            disabled={postStudentFinancesIdClose.isPending}
            isLoading={postStudentFinancesIdClose.isPending}
          >
            Close Contract
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
