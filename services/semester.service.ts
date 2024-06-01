import type { AxiosResponse } from 'axios';

import type { IApiResponse } from '@/types/response/api-response';
import type {
  ISemester,
  ISemesterPreview,
  ICreateSemesterRequest,
  IGenerateTimeTableRequest,
  IUpdateSemesterRequest,
} from '@/types/semester.interface';
import { $api } from '@/utils/api/interceptor';

const SEMESTER_URL = '/semester';

export const SemesterService = {
  async getAllGlobal(): Promise<AxiosResponse<Array<ISemesterPreview>>> {
    return $api.get<Array<ISemesterPreview>>(`${SEMESTER_URL}/global`);
  },

  async getByIdGlobal(semesterId: number): Promise<AxiosResponse<ISemester>> {
    return $api.get<ISemester>(`${SEMESTER_URL}/global/${semesterId}`);
  },

  async getAllByGroupId(
    groupId: number
  ): Promise<AxiosResponse<Array<ISemesterPreview>>> {
    return $api.get<Array<ISemesterPreview>>(
      `${SEMESTER_URL}/${groupId}/group`
    );
  },

  async getCurrent(groupId: number): Promise<AxiosResponse<ISemester>> {
    return $api.get<ISemester>(`${SEMESTER_URL}/current/${groupId}`);
  },

  async getStudentCurrent(
    studentId: number
  ): Promise<AxiosResponse<ISemester>> {
    return $api.get<ISemester>(`${SEMESTER_URL}/student-current/${studentId}`);
  },

  async getById(semesterId: number): Promise<AxiosResponse<ISemester>> {
    return $api.get<ISemester>(`${SEMESTER_URL}/${semesterId}`);
  },

  async create(
    data: ICreateSemesterRequest
  ): Promise<AxiosResponse<IApiResponse>> {
    return $api.post<IApiResponse>(SEMESTER_URL, data);
  },

  async generateTimeTable({
    groupId,
    semesterId,
    dailySchedules,
  }: IGenerateTimeTableRequest): Promise<AxiosResponse<IApiResponse>> {
    return $api.post<IApiResponse>(
      `${SEMESTER_URL}/generate/${semesterId}?groupId=${groupId}`,
      dailySchedules
    );
  },

  async update({
    id,
    data,
  }: IUpdateSemesterRequest): Promise<AxiosResponse<IApiResponse>> {
    return $api.put<IApiResponse>(`${SEMESTER_URL}/${id}`, data);
  },

  async delete(id: number): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(`${SEMESTER_URL}/${id}`);
  },
};
