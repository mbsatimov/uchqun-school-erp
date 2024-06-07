import { $api } from '@/utils/api';

export type GetLessonsConfig = RequestConfig | void;

export const getLessons = (requestConfig?: GetLessonsConfig) =>
  $api.get('lesson', requestConfig?.config);

type PostLessonParams = { dailyScheduleId: number; data: LessonRequest };
export type PostLessonConfig = RequestConfig<PostLessonParams>;

export const postLessons = ({ params, config }: PostLessonConfig) =>
  $api.post(`lesson/${params.dailyScheduleId}`, params.data, config);
