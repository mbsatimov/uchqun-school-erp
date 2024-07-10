import { $api } from '@/utils/api';
type PutStudentFinancesIdParams = {
  id: number;
  data: StudentFinanceRequest;
};
export type PutStudentFinancesIdRequest =
  ApiRequest<PutStudentFinancesIdParams>;

export const putStudentFinancesId = ({
  id,
  data,
  config,
}: PutStudentFinancesIdRequest) =>
  $api.put<ApiSuccessResponse>(`student-finance/${id}`, data, config);
