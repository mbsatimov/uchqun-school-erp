import { $api } from '@/utils/api';
type PostPaymentHistoryParams = {
  data: PaymentHistoryRequest;
};

export type PostPaymentHistoryRequest = ApiRequest<PostPaymentHistoryParams>;

export const postPaymentHistory = ({
  data,
  config,
}: PostPaymentHistoryRequest) =>
  $api.post<ApiSuccessResponse>('payment-history', data, config);
