import { $api } from '@/utils/api';

type GetLessonsTeacherParams = {
  id: number;
  params: { date?: string };
};

export type GetLessonsTeacherRequest = ApiRequest<GetLessonsTeacherParams>;

export const getLessonsTeacher = ({ id, config }: GetLessonsTeacherRequest) =>
  $api.get<LessonsResponse>(`lesson/teacher-today-lessons/${id}`, config);
