import { $api } from '@/utils/api';

export type GetAcademicYearsRequest = ApiRequest;

export const getAcademicYears = (request?: GetAcademicYearsRequest) =>
  $api.get<AcademicYearsResponse>('academic-years', request?.config);

type PostAcademicYearsParams = {
  data: StudentFinanceRequest;
};
export type PostAcademicYearsRequest = ApiRequest<PostAcademicYearsParams>;

export const postAcademicYears = ({ data, config }: PostAcademicYearsRequest) =>
  $api.post<ApiSuccessResponse>('academic-years', data, config);
