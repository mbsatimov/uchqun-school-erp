import { $api } from '@/utils/api/interceptor';

export type DeleteQuizRequestConfig = RequestConfig & {
  id: number;
};

export const deleteQuiz = ({ id, config }: DeleteQuizRequestConfig) =>
  $api.patch(`/quiz/${id}`, config);
