import { useQuery } from '@tanstack/react-query';

import type { GetMonthlyPaymentsIdRequest } from '@/utils/api';
import { getMonthlyPaymentsId } from '@/utils/api';

export const GET_MONTHLY_PAYMENTS_ID_QUERY_KEY = 'getMonthlyPaymentsId';

export const useGetMonthlyPaymentsIdQuery = (
  settings: QuerySettings<
    GetMonthlyPaymentsIdRequest,
    typeof getMonthlyPaymentsId
  >
) =>
  useQuery({
    queryKey: [GET_MONTHLY_PAYMENTS_ID_QUERY_KEY],
    queryFn: () => getMonthlyPaymentsId(settings.request),
    ...settings?.options,
  });
