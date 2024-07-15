interface MonthlyPayment {
  id: number;
  paymentMonth: string;
  isCompleted: boolean;
  amount: number;
}

type MonthlyPaymentsResponse = Array<MonthlyPayment>;
