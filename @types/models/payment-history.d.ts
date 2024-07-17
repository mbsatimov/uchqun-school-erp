interface PaymentHistory {
  id: number;
  date: string;
  amount: number;
  addedBy: string;
  payedFrom: string;
  comment: string;
  studentFinance: StudentFinance;
}

type PaymentHistoryResponse = Array<PaymentHistory>;

type PaymentHistoryRequest = {
  studentFinanceId: number;
  amount: number;
  payedFrom: string;
  comment?: string;
};
