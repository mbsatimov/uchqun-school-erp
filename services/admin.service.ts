import type { AxiosResponse } from 'axios';

import type { IApiResponse } from '@/types/response/api-response';
import { $api } from '@/utils/api/interceptor';

const ADMIN_URL = '/admin';

export const AdminService = {
  async getAll(): Promise<AxiosResponse<Array<AdminPreview>>> {
    return $api.get<Array<AdminPreview>>(ADMIN_URL);
  },

  async getById(id: number): Promise<AxiosResponse<Admin>> {
    return $api.get<Admin>(`${ADMIN_URL}/${id}`);
  },

  async create(data: AdminRequest): Promise<AxiosResponse<IApiResponse>> {
    return $api.post<IApiResponse>(ADMIN_URL, data);
  },

  async deleteById(id: number): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(`${ADMIN_URL}/${id}`);
  },

  async deleteSomeById(
    ids: Array<number>
  ): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(ADMIN_URL, { data: ids });
  },
};
