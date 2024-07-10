interface PaymentHistory {
  id: number;
  date: string;
  amount: number;
  addedBy: string;
  payedFrom: string;
  comment: string;
  contractStatus: ContractStatus;
  parent: Parent;
  contractId: number;
  createdAt: string;
  academicYear: AcademicYear;
  paymentPlan: PaymentPlan;
  studentFinance: StudentFinance;
}

type PaymentHistoryResponse = Array<PaymentHistory>;
