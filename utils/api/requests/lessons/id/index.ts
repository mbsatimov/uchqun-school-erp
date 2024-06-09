import { $api } from '@/utils/api';

type PutLessonParams = {
  id: number;
  data: LessonRequest;
  params: { isItForSemester: boolean };
};

export type PutLessonRequest = ApiRequest<PutLessonParams>;

export const putLessonsId = ({ id, data, config }: PutLessonRequest) =>
  $api.put(`lesson/${id}`, data, config);
