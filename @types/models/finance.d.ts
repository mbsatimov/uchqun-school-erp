interface Finance {
  id: number;
  firstName: string;
  lastName: string;
  studentParentId: number;
  studentStatus: 'ACTIVE' | 'INACTIVE';
  contractId: number;
  academicYearId: number;
  paymentPlanId: number;
}

type ContractStatus = 'ACTIVE' | 'CLOSED';

interface PaymentPlan {
  id: number;
  name: string;
  price: number;
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
