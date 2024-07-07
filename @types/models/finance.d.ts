type ContractStatus = 'ACTIVE' | 'CLOSED';

interface Finance {
  id: number;
  student: StudentPreview;
  studentParent: Parent;
  contractStatus: ContractStatus;
  contractId: number;
  academicYear: AcademicYear;
  paymentPlan: PaymentPlan | null;
}

interface PaymentHistory {
  id: number;
  date: string;
  amount: number;
  payedFrom: string;
  comment: string;
  createdAt: string;
  studentFinance: Finance;
}

interface MonthlyPayment {
  id: number;
  paymentMonth: string;
  isCompleted: boolean;
  amount: number;
}

type FinanceRequest = {
  studentId: number;
  paymentPlanId: number;
  academicYearId: number;
  contractId: number;
  studentJoinedTime: string;
};
