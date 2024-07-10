import { StudentFinanceForm } from '@/app/[locale]/admin/finances/students-finance/_components/student-finance-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
  defaultData?: StudentFinance;
  children: React.ReactNode;
};

export const StudentFinanceDialog = ({ defaultData, children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-full overflow-y-auto sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            {defaultData ? 'Edit' : 'Add'} student finance
          </DialogTitle>
        </DialogHeader>
        <StudentFinanceForm defaultData={defaultData} />
      </DialogContent>
    </Dialog>
  );
};
