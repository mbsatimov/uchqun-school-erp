import type { AxiosResponse } from 'axios';

import { $api } from '@/utils/api/interceptor';

const STUDENT_URL = '/student';

export const StudentService = {
  async getAll(): Promise<AxiosResponse<Array<StudentPreview>>> {
    return $api.get<Array<StudentPreview>>(STUDENT_URL);
  },

  async getById(id: number): Promise<AxiosResponse<Student>> {
    return $api.get<Student>(`${STUDENT_URL}/${id}`);
  },

  async getAttendanceOverview(
    id: number
  ): Promise<AxiosResponse<AttendanceOverview>> {
    return $api.get<AttendanceOverview>(`${STUDENT_URL}/${id}/attendance`);
  },

  async getAllByGroupId(
    id: number
  ): Promise<AxiosResponse<Array<StudentWithGroupPreview>>> {
    return $api.get<Array<StudentWithGroupPreview>>(
      `${STUDENT_URL}/${id}/group`
    );
  },

  async create(
    data: ICreateStudentRequest
  ): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.post<ApiErrorResponse>(STUDENT_URL, data);
  },

  async createAndAddToGroup({
    groupId,
    data,
  }: ICreateStudentAndAddToGroupRequest): Promise<
    AxiosResponse<ApiErrorResponse>
  > {
    return $api.post<ApiErrorResponse>(`${STUDENT_URL}/${groupId}/group`, data);
  },

  async createByFile(data: FormData): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.post<ApiErrorResponse>(`${STUDENT_URL}/save-by-file`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async createAndAddToGroupByFile({
    groupId,
    data,
  }: ICreateStudentAndAddToGroupByFileRequest): Promise<
    AxiosResponse<ApiErrorResponse>
  > {
    return $api.post<ApiErrorResponse>(
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
  ): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.put<ApiErrorResponse>(`${STUDENT_URL}/${id}`, data);
  },

  async updateGroup({
    studentId,
    groupId,
  }: IUpdateStudentGroupRequest): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.put<ApiErrorResponse>(
      `${STUDENT_URL}/update-group?studentId=${studentId}&groupId=${groupId}`
    );
  },

  async updateSomeGroup({
    ids,
    groupId,
  }: {
    ids: Array<number>;
    groupId: number;
  }): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.put<ApiErrorResponse>(
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
  }): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.put<ApiErrorResponse>(`${STUDENT_URL}/image/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async deleteById(id: number): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.delete<ApiErrorResponse>(`${STUDENT_URL}/${id}`);
  },

  async deleteSomeById(
    ids: Array<number>
  ): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.delete<ApiErrorResponse>(`${STUDENT_URL}`, { data: ids });
  },

  async removeFromGroup(id: number): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.delete<ApiErrorResponse>(
      `${STUDENT_URL}/delete-from-group/${id}`
    );
  },

  async removeSomeFromGroup(
    ids: Array<number>
  ): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.delete<ApiErrorResponse>(`${STUDENT_URL}/delete-from-group`, {
      data: ids,
    });
  },
};
