import type { AxiosResponse } from 'axios';

import type { IApiResponse } from '@/types/response/api-response';
import { $api } from '@/utils/api/interceptor';

const GROUP_URL = '/groups';

export const GroupService = {
  async getAll(): Promise<AxiosResponse<Array<GroupPreview>>> {
    return $api.get<Array<GroupPreview>>(GROUP_URL);
  },

  async getById(id: number): Promise<AxiosResponse<Group>> {
    return $api.get<Group>(`${GROUP_URL}/${id}`);
  },

  async create(data: GroupRequest): Promise<AxiosResponse<IApiResponse>> {
    return $api.post<IApiResponse>(GROUP_URL, data);
  },

  async update({
    id,
    data,
  }: IUpdateGroupRequest): Promise<AxiosResponse<IApiResponse>> {
    return $api.put<IApiResponse>(`${GROUP_URL}/${id}`, { data });
  },

  async delete(id: number): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(`${GROUP_URL}/${id}`);
  },

  async deleteWithStudents(id: number): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(`${GROUP_URL}/${id}/with-student`);
  },
};
