import type { AxiosResponse } from 'axios';

import type {
  TGroupRequest as ICreateGroupRequest,
  IGroup,
  IGroupPreview,
  IUpdateGroupRequest,
} from '@/types/group.interface';
import type { IApiResponse } from '@/types/response/api-response';
import { $api } from '@/utils/api/interceptor';

const GROUP_URL = '/groups';

export const GroupService = {
  async getAll(): Promise<AxiosResponse<Array<IGroupPreview>>> {
    return $api.get<Array<IGroupPreview>>(GROUP_URL);
  },

  async getById(id: number): Promise<AxiosResponse<IGroup>> {
    return $api.get<IGroup>(`${GROUP_URL}/${id}`);
  },

  async create(
    data: ICreateGroupRequest
  ): Promise<AxiosResponse<IApiResponse>> {
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
