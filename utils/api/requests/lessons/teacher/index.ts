import { $api } from '@/utils/api';

type GetLessonsTeacherParams = {
  params: { date?: string };
};

export type GetLessonsTeacherRequest = ApiRequest<GetLessonsTeacherParams>;

export const getLessonsTeacher = (request?: GetLessonsTeacherRequest) =>
  $api.get<LessonsResponse>('lesson/teacher', request?.config);
