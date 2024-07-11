import { $api } from '@/utils/api';

export type GetAcademicYearsRequest = ApiRequest;

export const getAcademicYears = (request?: GetAcademicYearsRequest) =>
  $api.get<AcademicYearsResponse>('academic-years', request?.config);

type PostAcademicYearsParams = {
  data: AcademicYearsRequest;
};
export type PostAcademicYearsRequest = ApiRequest<PostAcademicYearsParams>;

export const postAcademicYears = ({ data, config }: PostAcademicYearsRequest) =>
  $api.post<ApiSuccessResponse>('academic-years', data, config);

type PutAcademicYearsIdParams = {
  id: number;
  data: AcademicYearsRequest;
};
export type PutAcademicYearsIdRequest = ApiRequest<PutAcademicYearsIdParams>;

export const putAcademicYearsId = ({
  id,
  data,
  config,
}: PutAcademicYearsIdRequest) =>
  $api.put<ApiSuccessResponse>(`academic-years/${id}`, data, config);
