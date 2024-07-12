import { $api } from '@/utils/api';

type GetStudentFinancesIdParams = {
  id: number;
};
export type GetStudentFinancesIdRequest =
  ApiRequest<GetStudentFinancesIdParams>;

export const getStudentFinancesId = ({
  id,
  config,
}: GetStudentFinancesIdRequest) =>
  $api.get<StudentFinanceResponse>(`student-finances/${id}`, config);

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
  $api.put<ApiSuccessResponse>(`student-finances/${id}`, data, config);
