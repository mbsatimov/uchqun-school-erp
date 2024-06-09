import type { AxiosResponse } from 'axios';

import { $api } from '@/utils/api/interceptor';

const GROUP_URL = '/groups';

export const GroupService = {
  async getAll(): Promise<AxiosResponse<Array<GroupPreview>>> {
    return $api.get<Array<GroupPreview>>(GROUP_URL);
  },

  async getById(id: number): Promise<AxiosResponse<Group>> {
    return $api.get<Group>(`${GROUP_URL}/${id}`);
  },

  async create(data: GroupRequest): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.post<ApiErrorResponse>(GROUP_URL, data);
  },

  async update({
    id,
    data,
  }: IUpdateGroupRequest): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.put<ApiErrorResponse>(`${GROUP_URL}/${id}`, { data });
  },

  async delete(id: number): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.delete<ApiErrorResponse>(`${GROUP_URL}/${id}`);
  },

  async deleteWithStudents(
    id: number
  ): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.delete<ApiErrorResponse>(`${GROUP_URL}/${id}/with-student`);
  },
};
