import { $api } from '@/utils/api';

type PostStudentFinancesIdCloseParams = {
  id: number;
};
export type PostStudentFinancesIdCloseRequest =
  ApiRequest<PostStudentFinancesIdCloseParams>;

export const postStudentFinancesIdClose = ({
  id,
  config,
}: PostStudentFinancesIdCloseRequest) =>
  $api.post<ApiSuccessResponse>(`student-finances/close/${id}`, {}, config);
