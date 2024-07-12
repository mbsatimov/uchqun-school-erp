import { useMutation, useQuery } from '@tanstack/react-query';

import type {
  GetPaymentHistoryRequest,
  PostPaymentHistoryRequest,
} from '@/utils/api';
import { getPaymentHistory, postPaymentHistory } from '@/utils/api';

export const GET_PAYMENT_HISTORY_QUERY_KEY = 'getPaymentHistory';

export const useGetPaymentHistoryQuery = (
  settings?: QuerySettings<GetPaymentHistoryRequest, typeof getPaymentHistory>
) =>
  useQuery({
    queryKey: [GET_PAYMENT_HISTORY_QUERY_KEY],
    queryFn: () => getPaymentHistory(settings?.request),
    ...settings?.options,
  });

export const POST_PAYMENT_HISTORY_MUTATION_KEY = 'postPaymentHistory';

export const usePostPaymentHistoryMutation = (
  settings?: MutationSettings<
    PostPaymentHistoryRequest,
    typeof postPaymentHistory
  >
) =>
  useMutation({
    mutationKey: [POST_PAYMENT_HISTORY_MUTATION_KEY],
    mutationFn: postPaymentHistory,
    ...settings?.options,
  });
