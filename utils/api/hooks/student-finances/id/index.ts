import { useMutation } from '@tanstack/react-query';

import type { PutStudentFinancesIdRequest } from '@/utils/api';
import { putStudentFinancesId } from '@/utils/api';

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
