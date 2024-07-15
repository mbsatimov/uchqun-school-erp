import { $api } from '@/utils/api';

type GetPaymentHistoryIdParams = ApiRequest & {
  id: number | string;
};

export type GetPaymentHistoryIdRequest = GetPaymentHistoryIdParams;

export const getPaymentHistoryId = ({
  id,
  config,
}: GetPaymentHistoryIdRequest) =>
  $api.get<PaymentHistoryResponse>(
    `payment-history/student-finance/${id}`,
    config
  );
