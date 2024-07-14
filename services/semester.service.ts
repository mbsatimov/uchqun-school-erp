import { $api } from '@/utils/api/interceptor';

const SEMESTER_URL = '/semester';

export const SemesterService = {
  async getAllGlobal() {
    return $api.get<Array<ISemesterPreview>>(`${SEMESTER_URL}/global`);
  },

  async getByIdGlobal(semesterId: number) {
    return $api.get<ISemester>(`${SEMESTER_URL}/global/${semesterId}`);
  },

  async getAllByGroupId(groupId: number) {
    return $api.get<Array<ISemesterPreview>>(
      `${SEMESTER_URL}/${groupId}/group`
    );
  },

  async getCurrent(groupId: number) {
    return $api.get<ISemester>(`${SEMESTER_URL}/current/${groupId}`);
  },

  async getStudentCurrent() {
    return $api.get<ISemester>(`${SEMESTER_URL}/student-current`);
  },

  async getById(semesterId: number) {
    return $api.get<ISemester>(`${SEMESTER_URL}/${semesterId}`);
  },

  async create(data: ICreateSemesterRequest) {
    return $api.post<ApiErrorResponse>(SEMESTER_URL, data);
  },

  async generateTimeTable({
    groupId,
    semesterId,
    dailySchedules,
  }: IGenerateTimeTableRequest) {
    return $api.post<ApiErrorResponse>(
      `${SEMESTER_URL}/generate/${semesterId}?groupId=${groupId}`,
      dailySchedules
    );
  },

  async update({ id, data }: IUpdateSemesterRequest) {
    return $api.put<ApiErrorResponse>(`${SEMESTER_URL}/${id}`, data);
  },

  async delete(id: number) {
    return $api.delete<ApiErrorResponse>(`${SEMESTER_URL}/${id}`);
  },
};
