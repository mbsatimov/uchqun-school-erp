import { $api } from '@/utils/api';

export type GetStudentFinancesRequest = ApiRequest;

export const getStudentFinances = (request?: GetStudentFinancesRequest) =>
  $api.get<StudentFinancesResponse>('student-finances', request?.config);

type PostStudentFinancesParams = {
  data: StudentFinanceRequest;
};
export type PostStudentFinancesRequest = ApiRequest<PostStudentFinancesParams>;

export const postStudentFinances = ({
  data,
  config,
}: PostStudentFinancesRequest) =>
  $api.post<ApiSuccessResponse>('student-finances', data, config);

type PutStudentFinancesParams = {
  data: StudentFinanceRequest;
};
export type PutStudentFinancesRequest = ApiRequest<PutStudentFinancesParams>;

export const putStudentFinances = ({
  data,
  config,
}: PutStudentFinancesRequest) =>
  $api.put<ApiSuccessResponse>('student-finances', data, config);
