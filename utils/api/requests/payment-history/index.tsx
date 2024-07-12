import { $api } from '@/utils/api';

export type GetPaymentHistoryRequest = ApiRequest;

export const getPaymentHistory = (request?: GetPaymentHistoryRequest) =>
  $api.get<PaymentHistoryResponse>('payment-history', request?.config);

type PostPaymentHistoryParams = {
  data: PaymentHistoryRequest;
};

export type PostPaymentHistoryRequest = ApiRequest<PostPaymentHistoryParams>;

export const postPaymentHistory = ({
  data,
  config,
}: PostPaymentHistoryRequest) =>
  $api.post<ApiSuccessResponse>('payment-history', data, config);
