import type { AxiosResponse } from 'axios';

import type { IApiResponse } from '@/types/response/api-response';
import { $api } from '@/utils/api/interceptor';

const COURSE_URL = '/course';

export const CourseService = {
  async getAll(): Promise<AxiosResponse<Array<Course>>> {
    return $api.get<Array<Course>>(COURSE_URL);
  },

  async getById(id: number): Promise<AxiosResponse<Course>> {
    return $api.get<Course>(`${COURSE_URL}/${id}`);
  },

  async create(data: CourseRequest): Promise<AxiosResponse<IApiResponse>> {
    return $api.post<IApiResponse>(COURSE_URL, data);
  },

  async update({
    id,
    data,
  }: IUpdateCourseRequest): Promise<AxiosResponse<IApiResponse>> {
    return $api.put<IApiResponse>(`${COURSE_URL}/${id}`, data);
  },

  async deleteById(id: number): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(`${COURSE_URL}/${id}`);
  },

  async deleteSomeById(
    ids: Array<number>
  ): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(COURSE_URL, { data: ids });
  },
};
