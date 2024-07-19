import { useQuery } from '@tanstack/react-query';

import type { GetStudentFinancesStudentRequest } from '@/utils/api';
import { getStudentFinancesStudent } from '@/utils/api';

export const GET_STUDENT_FIANCES_STUDENT_QUERY_KEY =
  'getStudentFinancesStudent';

export const useGetStudentFinancesStudentQuery = (
  settings?: QuerySettings<
    GetStudentFinancesStudentRequest,
    typeof getStudentFinancesStudent
  >
) =>
  useQuery({
    queryKey: [GET_STUDENT_FIANCES_STUDENT_QUERY_KEY],
    queryFn: () => getStudentFinancesStudent(settings?.request),
    ...settings?.options,
  });
