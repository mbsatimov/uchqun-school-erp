type ContractStatus = 'ACTIVE' | 'CLOSED';

interface StudentFinance {
  id: number;
  student: StudentPreview;
  parent: Parent;
  contractStatus: ContractStatus;
  contractId: number;
  academicYear: AcademicYear;
  paymentPlan: PaymentPlan;
}

type StudentFinanceRequest = {
  studentId: number;
  paymentPlanId: number;
  academicYearId: number;
  contractId: number;
  studentJoinedDate: string;
};

type StudentFinancesResponse = Array<StudentFinance>;

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
