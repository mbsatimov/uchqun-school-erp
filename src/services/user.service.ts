import type { AxiosResponse } from 'axios';

import type { IApiResponse } from '@/types/response/api-response';
import type { EnumRole, IUser , ICreateUserRequest } from '@/types/user.interface';
import { $api } from '@/utils/api/interceptor';


const USER_URL = '/user';

export const UserService = {
  async getAll(): Promise<AxiosResponse<Array<IUser>>> {
    return $api.get<Array<IUser>>(USER_URL);
  },

  async getById(id: number, role: EnumRole): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`${USER_URL}/${id}?role=${role}`);
  },

  async create(data: ICreateUserRequest): Promise<AxiosResponse<IApiResponse>> {
    return $api.post<IApiResponse>(USER_URL, data);
  },

  async createByFile({
    data,
    role,
  }: {
    data: FormData;
    role: EnumRole;
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
    role: EnumRole;
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
    data: Array<{ id: number; role: EnumRole }>
  ): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(USER_URL, { data: data });
  },

  async deleteProfileImage({
    id,
    role,
  }: {
    id: number;
    role: EnumRole;
  }): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(
      `${USER_URL}/delete-image/${id}?role=${role}`
    );
  },
};
