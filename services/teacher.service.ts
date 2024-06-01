import type { AxiosResponse } from 'axios';

import type { IApiResponse } from '@/types/response/api-response';
import type {
  ICreateTeacherRequest,
  ITeacher,
  ITeacherPreview,
  IUpdateTeacherRequest,
} from '@/types/teacher.interface';
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
  ): Promise<AxiosResponse<IApiResponse>> {
    return $api.post<IApiResponse>(TEACHER_URL, data);
  },

  async update({
    id,
    data,
  }: IUpdateTeacherRequest): Promise<AxiosResponse<IApiResponse>> {
    return $api.put<IApiResponse>(`${TEACHER_URL}/${id}`, data);
  },

  async deleteById(id: number): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(`${TEACHER_URL}/${id}`);
  },

  async deleteSomeById(
    ids: Array<number>
  ): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(TEACHER_URL, { data: ids });
  },
};
