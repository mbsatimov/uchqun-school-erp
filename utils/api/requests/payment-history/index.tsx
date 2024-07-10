import { $api } from '@/utils/api';

export type GetPaymentHistoryRequest = ApiRequest;

export const getPaymentHistory = (request?: GetPaymentHistoryRequest) =>
  $api.get<PaymentHistoryResponse>('payment-history', request?.config);
