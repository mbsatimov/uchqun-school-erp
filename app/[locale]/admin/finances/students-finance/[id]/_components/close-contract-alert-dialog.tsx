'use client';

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
import { usePostStudentFinancesIdCloseMutation } from '@/utils/api';

type Props = {
  studentFinanceId: number;
  contractStatus: ContractStatus;
};

export const CloseContractAlertDialog = ({
  studentFinanceId,
  contractStatus,
}: Props) => {
  const postStudentFinancesIdClose = usePostStudentFinancesIdCloseMutation({
    options: {
      onSuccess: () => {
        toast.success('Contract closed');
      },
    },
  });

  const onSubmit = () => {
    postStudentFinancesIdClose.mutate({ id: studentFinanceId });
  };

  if (contractStatus !== 'ACTIVE') return null;

  return (
    <AlertDialog>
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
