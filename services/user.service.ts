import type { AxiosResponse } from 'axios';

import type { IApiResponse } from '@/types/response/api-response';
import { $api } from '@/utils/api/interceptor';

const USER_URL = '/user';

export const UserService = {
  async getAll(): Promise<AxiosResponse<Array<User>>> {
    return $api.get<Array<User>>(USER_URL);
  },

  async getById(id: number, role: Role): Promise<AxiosResponse<User>> {
    return $api.get<User>(`${USER_URL}/${id}?role=${role}`);
  },

  async create(data: UserRequest): Promise<AxiosResponse<IApiResponse>> {
    return $api.post<IApiResponse>(USER_URL, data);
  },

  async createByFile({
    data,
    role,
  }: {
    data: FormData;
    role: Role;
  }): Promise<AxiosResponse<IApiResponse>> {
    return $api.post<IApiResponse>(`${USER_URL}/file?role=${role}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async updateProfileImage({
    id,
    data,
    role,
  }: {
    id: number;
    data: FormData;
    role: Role;
  }): Promise<AxiosResponse<IApiResponse>> {
    return $api.put<IApiResponse>(
      `${USER_URL}/upload-image/${id}?role=${role}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },

  async deleteSomeById(
    data: Array<{ id: number; role: Role }>
  ): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(USER_URL, { data: data });
  },

  async deleteProfileImage({
    id,
    role,
  }: {
    id: number;
    role: Role;
  }): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(
      `${USER_URL}/delete-image/${id}?role=${role}`
    );
  },
};
