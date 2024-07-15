import { useMutation } from '@tanstack/react-query';

import type { PostPaymentHistoryRequest } from '@/utils/api';
import { postPaymentHistory } from '@/utils/api';

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
