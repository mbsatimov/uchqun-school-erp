import type { AxiosResponse } from 'axios';

import { $api } from '@/utils/api/interceptor';

const TEACHER_URL = '/teacher';

export const TeacherService = {
  async getAll(): Promise<AxiosResponse<Array<ITeacherPreview>>> {
    return $api.get<Array<ITeacherPreview>>(TEACHER_URL);
  },

  async getById(id: number): Promise<AxiosResponse<ITeacher>> {
    return $api.get<ITeacher>(`${TEACHER_URL}/${id}`);
  },

  async create(
    data: ICreateTeacherRequest
  ): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.post<ApiErrorResponse>(TEACHER_URL, data);
  },

  async update({
    id,
    data,
  }: IUpdateTeacherRequest): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.put<ApiErrorResponse>(`${TEACHER_URL}/${id}`, data);
  },

  async deleteById(id: number): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.delete<ApiErrorResponse>(`${TEACHER_URL}/${id}`);
  },

  async deleteSomeById(
    ids: Array<number>
  ): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.delete<ApiErrorResponse>(TEACHER_URL, { data: ids });
  },
};
