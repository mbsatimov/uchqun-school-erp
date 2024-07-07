import { useMutation, useQuery } from '@tanstack/react-query';

import type {
  GetPaymentPlansRequest,
  PostPaymentPlanRequest,
} from '@/utils/api';
import { getPaymentPlans, postPaymentPlans } from '@/utils/api';

export const GET_PAYMENT_PLANS_QUERY_KEY = 'getPaymentPlans';

export const useGetPaymentPlansQuery = (
  settings?: QuerySettings<GetPaymentPlansRequest, typeof getPaymentPlans>
) =>
  useQuery({
    queryKey: [GET_PAYMENT_PLANS_QUERY_KEY],
    queryFn: () => getPaymentPlans(settings?.request),
    ...settings?.options,
  });

export const POST_PAYMENT_PLANS_MUTATION_KEY = 'postPaymentPlans';

export const usePostPaymentPlansMutation = (
  settings?: MutationSettings<PostPaymentPlanRequest, typeof postPaymentPlans>
) =>
  useMutation({
    mutationKey: [POST_PAYMENT_PLANS_MUTATION_KEY],
    mutationFn: postPaymentPlans,
    ...settings?.options,
  });
