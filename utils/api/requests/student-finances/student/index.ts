import { $api } from '@/utils/api';

export type GetStudentFinancesStudentRequest = ApiRequest;

export const getStudentFinancesStudent = (
  request?: GetStudentFinancesStudentRequest
) =>
  $api.get<StudentFinanceResponse>('student-finances/student', request?.config);
