import { useQuery } from '@tanstack/react-query';

import type { GetPaymentHistoryIdRequest } from '@/utils/api';
import { getPaymentHistoryId } from '@/utils/api';

export const GET_PAYMENT_HISTORY_ID_QUERY_KEY = 'getPaymentHistoryId';

export const useGetPaymentHistoryIdQuery = (
  settings: QuerySettings<
    GetPaymentHistoryIdRequest,
    typeof getPaymentHistoryId
  >
) =>
  useQuery({
    queryKey: [GET_PAYMENT_HISTORY_ID_QUERY_KEY, settings.request.id],
    queryFn: () => getPaymentHistoryId(settings.request),
    ...settings?.options,
  });
