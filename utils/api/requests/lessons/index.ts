import { $api } from '@/utils/api';

type GetLessonParams = { params: { isItForSemester: boolean } };
export type GetLessonsConfig = ApiRequest<GetLessonParams>;

export const getLessons = (request?: GetLessonsConfig) =>
  $api.get('lesson', request?.config);

type PostLessonParams = { dailyScheduleId: number; data: LessonRequest };
export type PostLessonRequest = ApiRequest<PostLessonParams>;

export const postLessons = ({
  dailyScheduleId,
  data,
  config,
}: PostLessonRequest) => $api.post(`lesson/${dailyScheduleId}`, data, config);
