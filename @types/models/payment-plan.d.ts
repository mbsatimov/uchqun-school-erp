interface PaymentPlan {
  id: number;
  name: string;
  price: number;
}

type PaymentPlansResponse = Array<PaymentPlan>;

type PaymentPlanRequest = Omit<PaymentPlan, 'id'>;
