import type { AxiosResponse } from 'axios';

import { $api } from '@/utils/api/interceptor';

const EXAM_URL = '/exam';

export const ExamService = {
  async getAll(): Promise<AxiosResponse<Array<IExam>>> {
    return $api.get<Array<IExam>>(EXAM_URL);
  },

  async getById(id: number): Promise<AxiosResponse<IExam>> {
    return $api.get<IExam>(`${EXAM_URL}/${id}`);
  },
};
