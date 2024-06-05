import type { AxiosResponse } from 'axios';

import type { IApiResponse } from '@/types/response/api-response';
import { $api } from '@/utils/api/interceptor';

const STUDENT_URL = '/student';

export const StudentService = {
  async getAll(): Promise<AxiosResponse<Array<IStudentPreview>>> {
    return $api.get<Array<IStudentPreview>>(STUDENT_URL);
  },

  async getById(id: number): Promise<AxiosResponse<IStudent>> {
    return $api.get<IStudent>(`${STUDENT_URL}/${id}`);
  },

  async getAttendanceOverview(
    id: number
  ): Promise<AxiosResponse<AttendanceOverview>> {
    return $api.get<AttendanceOverview>(`${STUDENT_URL}/${id}/attendance`);
  },

  async getAllByGroupId(
    id: number
  ): Promise<AxiosResponse<Array<IStudentWithGroupPreview>>> {
    return $api.get<Array<IStudentWithGroupPreview>>(
      `${STUDENT_URL}/${id}/group`
    );
  },

  async create(
    data: ICreateStudentRequest
  ): Promise<AxiosResponse<IApiResponse>> {
    return $api.post<IApiResponse>(STUDENT_URL, data);
  },

  async createAndAddToGroup({
    groupId,
    data,
  }: ICreateStudentAndAddToGroupRequest): Promise<AxiosResponse<IApiResponse>> {
    return $api.post<IApiResponse>(`${STUDENT_URL}/${groupId}/group`, data);
  },

  async createByFile(data: FormData): Promise<AxiosResponse<IApiResponse>> {
    return $api.post<IApiResponse>(`${STUDENT_URL}/save-by-file`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async createAndAddToGroupByFile({
    groupId,
    data,
  }: ICreateStudentAndAddToGroupByFileRequest): Promise<
    AxiosResponse<IApiResponse>
  > {
    return $api.post<IApiResponse>(
      `${STUDENT_URL}/${groupId}/save-by-file`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },

  async update(
    id: number,
    data: IUpdateStudentRequest
  ): Promise<AxiosResponse<IApiResponse>> {
    return $api.put<IApiResponse>(`${STUDENT_URL}/${id}`, data);
  },

  async updateGroup({
    studentId,
    groupId,
  }: IUpdateStudentGroupRequest): Promise<AxiosResponse<IApiResponse>> {
    return $api.put<IApiResponse>(
      `${STUDENT_URL}/update-group?studentId=${studentId}&groupId=${groupId}`
    );
  },

  async updateSomeGroup({
    ids,
    groupId,
  }: {
    ids: Array<number>;
    groupId: number;
  }): Promise<AxiosResponse<IApiResponse>> {
    return $api.put<IApiResponse>(
      `${STUDENT_URL}/update-some-group/${groupId}`,
      ids
    );
  },

  async updateImage({
    id,
    data,
  }: {
    id: number;
    data: FormData;
  }): Promise<AxiosResponse<IApiResponse>> {
    return $api.put<IApiResponse>(`${STUDENT_URL}/image/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async deleteById(id: number): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(`${STUDENT_URL}/${id}`);
  },

  async deleteSomeById(
    ids: Array<number>
  ): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(`${STUDENT_URL}`, { data: ids });
  },

  async removeFromGroup(id: number): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(`${STUDENT_URL}/delete-from-group/${id}`);
  },

  async removeSomeFromGroup(
    ids: Array<number>
  ): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(`${STUDENT_URL}/delete-from-group`, {
      data: ids,
    });
  },
};
