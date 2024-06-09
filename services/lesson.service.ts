import type { AxiosResponse } from 'axios';

import { $api } from '@/utils/api/interceptor';

const LESSON_URL = '/lesson';

export const LessonService = {
  async getById(id: number): Promise<AxiosResponse<Lesson>> {
    return $api.get<Lesson>(`${LESSON_URL}/${id}`);
  },

  async getTeacherTodayLessons(
    teacherId: number
  ): Promise<AxiosResponse<Array<LessonPreview>>> {
    return $api.get<Array<LessonPreview>>(
      `${LESSON_URL}/teacher-today-lessons/${teacherId}`
    );
  },

  async getLessonsByDailyScheduleId(
    dailyScheduleId: number
  ): Promise<AxiosResponse<Array<Lesson>>> {
    return $api.get<Array<Lesson>>(
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
    data: LessonRequest;
  }): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.post<ApiErrorResponse>(
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
  }): Promise<AxiosResponse<ApiErrorResponse>> {
    return $api.delete<ApiErrorResponse>(
      `${LESSON_URL}/${lessonId}?isItForSemester=${allWeeks}`
    );
  },
};
