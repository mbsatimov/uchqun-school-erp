import type { AxiosResponse } from 'axios';

import type { IAdmin, IAdminPreview , ICreateAdminRequest } from '@/types/admin.interface';
import type { IApiResponse } from '@/types/response/api-response';
import { $api } from '@/utils/api/interceptor';


const ADMIN_URL = '/admin';

export const AdminService = {
  async getAll(): Promise<AxiosResponse<Array<IAdminPreview>>> {
    return $api.get<Array<IAdminPreview>>(ADMIN_URL);
  },

  async getById(id: number): Promise<AxiosResponse<IAdmin>> {
    return $api.get<IAdmin>(`${ADMIN_URL}/${id}`);
  },

  async create(
    data: ICreateAdminRequest
  ): Promise<AxiosResponse<IApiResponse>> {
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
