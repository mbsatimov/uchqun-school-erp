import { $api } from '@/utils/api';

export type GetPaymentPlansRequest = ApiRequest;

export const getPaymentPlans = (request?: GetPaymentPlansRequest) =>
  $api.get<PaymentPlansResponse>('payment-plans', request?.config);

type PostPaymentPlansParams = {
  data: PaymentPlanRequest;
};

export type PostPaymentPlansRequest = ApiRequest<PostPaymentPlansParams>;

export const postPaymentPlans = ({ data, config }: PostPaymentPlansRequest) =>
  $api.post('payment-plans', data, config);
