import type { AxiosResponse } from 'axios';

import type {
  ILesson,
  ILessonPreview,
  ILessonCreate,
} from '@/types/lesson.interface';
import type { IApiResponse } from '@/types/response/api-response';
import { $api } from '@/utils/api/interceptor';

const LESSON_URL = '/lesson';

export const LessonService = {
  async getById(id: number): Promise<AxiosResponse<ILesson>> {
    return $api.get<ILesson>(`${LESSON_URL}/${id}`);
  },

  async getTeacherTodayLessons(
    teacherId: number
  ): Promise<AxiosResponse<Array<ILessonPreview>>> {
    return $api.get<Array<ILessonPreview>>(
      `${LESSON_URL}/teacher-today-lessons/${teacherId}`
    );
  },

  async getLessonsByDailyScheduleId(
    dailyScheduleId: number
  ): Promise<AxiosResponse<Array<ILesson>>> {
    return $api.get<Array<ILesson>>(
      `${LESSON_URL}/${dailyScheduleId}/daily-schedule`
    );
  },

  async create({
    dailyScheduleId,
    allWeeks,
    data,
  }: {
    dailyScheduleId: number;
    allWeeks: boolean;
    data: ILessonCreate;
  }): Promise<AxiosResponse<IApiResponse>> {
    return $api.post<IApiResponse>(
      `${LESSON_URL}/${dailyScheduleId}?isItForSemester=${allWeeks}`,
      data
    );
  },

  async delete({
    lessonId,
    allWeeks,
  }: {
    lessonId: number;
    allWeeks: boolean;
  }): Promise<AxiosResponse<IApiResponse>> {
    return $api.delete<IApiResponse>(
      `${LESSON_URL}/${lessonId}?isItForSemester=${allWeeks}`
    );
  },
};
