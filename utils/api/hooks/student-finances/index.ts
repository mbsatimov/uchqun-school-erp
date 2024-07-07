import { useMutation, useQuery } from '@tanstack/react-query';

import type {
  GetStudentFinancesRequest,
  PostStudentFinancesRequest,
} from '@/utils/api';
import { getStudentFinances, postStudentFinances } from '@/utils/api';

export const GET_STUDENT_FIANCES_QUERY_KEY = 'getStudentFinances';

export const useGetStudentFinancesQuery = (
  settings?: QuerySettings<GetStudentFinancesRequest, typeof getStudentFinances>
) =>
  useQuery({
    queryKey: [GET_STUDENT_FIANCES_QUERY_KEY],
    queryFn: () => getStudentFinances(settings?.request),
    ...settings?.options,
  });

export const POST_STUDENT_FIANCES_MUTATION_KEY = 'postStudentFinances';

export const usePostStudentFinancesMutation = (
  settings?: MutationSettings<
    PostStudentFinancesRequest,
    typeof postStudentFinances
  >
) =>
  useMutation({
    mutationKey: [POST_STUDENT_FIANCES_MUTATION_KEY],
    mutationFn: postStudentFinances,
    ...settings?.options,
  });
