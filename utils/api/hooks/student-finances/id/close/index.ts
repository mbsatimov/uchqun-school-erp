import { useMutation } from '@tanstack/react-query';

import {
  postStudentFinancesIdClose,
  PostStudentFinancesIdCloseRequest,
} from '@/utils/api/requests';

export const POST_STUDENT_FIANCES_ID_CLOSE_MUTATION_KEY =
  'postStudentFinancesIdClose';

export const usePostStudentFinancesIdCloseMutation = (
  settings?: MutationSettings<
    PostStudentFinancesIdCloseRequest,
    typeof postStudentFinancesIdClose
  >
) =>
  useMutation({
    mutationKey: [POST_STUDENT_FIANCES_ID_CLOSE_MUTATION_KEY],
    mutationFn: postStudentFinancesIdClose,
    ...settings?.options,
  });
