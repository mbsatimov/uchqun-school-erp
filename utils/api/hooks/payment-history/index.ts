import { useQuery } from '@tanstack/react-query';

import type { GetPaymentHistoryRequest } from '@/utils/api';
import { getPaymentHistory } from '@/utils/api';

export const GET_PAYMENT_HISTORY_QUERY_KEY = 'getPaymentHistory';

export const useGetPaymentHistoryQuery = (
  settings?: QuerySettings<GetPaymentHistoryRequest, typeof getPaymentHistory>
) =>
  useQuery({
    queryKey: [GET_PAYMENT_HISTORY_QUERY_KEY],
    queryFn: () => getPaymentHistory(settings?.request),
    ...settings?.options,
  });
