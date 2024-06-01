import { $api } from '@/utils/api/interceptor';

export type PostQuizAnswersParams = {
  quizId: number;
  answers: Array<{
    questionId: number;
    answerId: number;
  }>;
};

export type PostQuizAnswersRequestConfig = RequestConfig<PostQuizAnswersParams>;

export const postQuizAnswers = ({
  params,
  config,
}: PostQuizAnswersRequestConfig) =>
  $api.post(`/quiz${params.quizId}/visible-post`, params, config);
