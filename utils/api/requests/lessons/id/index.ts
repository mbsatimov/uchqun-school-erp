import { $api } from '@/utils/api';

type PutLessonParams = {
  id: number;
  data: LessonRequest;
};

export type PutLessonConfig = RequestConfig<PutLessonParams>;

export const putLesson = ({ params, config }: PutLessonConfig) =>
  $api.put(`lesson/${params.id}`, params.data, config);
