import type { AxiosResponse } from 'axios';

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
  ): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.post<ApiErrorResponse>(SEMESTER_URL, data);
  },

  async generateTimeTable({
    groupId,
    semesterId,
    dailySchedules,
  }: IGenerateTimeTableRequest): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.post<ApiErrorResponse>(
      `${SEMESTER_URL}/generate/${semesterId}?groupId=${groupId}`,
      dailySchedules
    );
  },

  async update({
    id,
    data,
  }: IUpdateSemesterRequest): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.put<ApiErrorResponse>(`${SEMESTER_URL}/${id}`, data);
  },

  async delete(id: number): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.delete<ApiErrorResponse>(`${SEMESTER_URL}/${id}`);
  },
};
