import { useMutation, useQuery } from '@tanstack/react-query';

import type {
  GetStudentFinancesIdRequest,
  PutStudentFinancesIdRequest,
} from '@/utils/api';
import { getStudentFinancesId, putStudentFinancesId } from '@/utils/api';

export const GET_STUDENT_FIANCES_ID_QUERY_KEY = 'getStudentFinancesId';

export const useGetStudentFinancesIdQuery = (
  settings: QuerySettings<
    GetStudentFinancesIdRequest,
    typeof getStudentFinancesId
  >
) =>
  useQuery({
    queryKey: [GET_STUDENT_FIANCES_ID_QUERY_KEY, settings.request.id],
    queryFn: () => getStudentFinancesId(settings.request),
    ...settings?.options,
  });

export const PUT_STUDENT_FIANCES_ID_MUTATION_KEY = 'putStudentFinancesId';

export const usePutStudentFinancesIdMutation = (
  settings?: MutationSettings<
    PutStudentFinancesIdRequest,
    typeof putStudentFinancesId
  >
) =>
  useMutation({
    mutationKey: [PUT_STUDENT_FIANCES_ID_MUTATION_KEY],
    mutationFn: putStudentFinancesId,
    ...settings?.options,
  });
