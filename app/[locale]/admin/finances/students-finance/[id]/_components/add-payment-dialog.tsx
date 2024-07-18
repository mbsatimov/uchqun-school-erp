import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { PaymentForm } from './payment-form';

export const AddPaymentDialog = ({
  studentFinanceId,
}: {
  studentFinanceId: number;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-1" size={20} />
          Add payment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-full overflow-y-auto sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Add payment</DialogTitle>
        </DialogHeader>
        <PaymentForm studentFinanceId={studentFinanceId} />
      </DialogContent>
    </Dialog>
  );
};
