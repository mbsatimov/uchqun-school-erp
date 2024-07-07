import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { PaymentPlanForm } from './_components/payment-plan-form';
import { PaymentPlanList } from './_components/payment-plan-list';

const PaymentPlansPage = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="mr-1" size={20} />
            <span>Create new group</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-full overflow-y-auto sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Add new payment plan</DialogTitle>
          </DialogHeader>
          <PaymentPlanForm />
        </DialogContent>
      </Dialog>
      <div className="mt-4">
        <PaymentPlanList />
      </div>
    </div>
  );
};

export default PaymentPlansPage;
