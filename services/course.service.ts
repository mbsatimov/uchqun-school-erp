import type { AxiosResponse } from 'axios';

import { $api } from '@/utils/api/interceptor';

const COURSE_URL = '/course';

export const CourseService = {
  async getAll(): Promise<AxiosResponse<Array<Course>>> {
    return $api.get<Array<Course>>(COURSE_URL);
  },

  async getById(id: number): Promise<AxiosResponse<Course>> {
    return $api.get<Course>(`${COURSE_URL}/${id}`);
  },

  async create(data: CourseRequest): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.post<ApiErrorResponse>(COURSE_URL, data);
  },

  async update({
    id,
    data,
  }: IUpdateCourseRequest): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.put<ApiErrorResponse>(`${COURSE_URL}/${id}`, data);
  },

  async deleteById(id: number): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.delete<ApiErrorResponse>(`${COURSE_URL}/${id}`);
  },

  async deleteSomeById(
    ids: Array<number>
  ): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.delete<ApiErrorResponse>(COURSE_URL, { data: ids });
  },
};
