import { $api } from '@/utils/api';

export type GetPaymentPlansRequest = ApiRequest;

export const getPaymentPlans = (request?: GetPaymentPlansRequest) =>
  $api.get<PaymentPlansResponse>('payment-plans', request?.config);

type PostPaymentPlanParams = {
  data: PaymentPlanRequest;
};

export type PostPaymentPlanRequest = ApiRequest<PostPaymentPlanParams>;

export const postPaymentPlans = ({ data, config }: PostPaymentPlanRequest) =>
  $api.post('payment-plans', data, config);
