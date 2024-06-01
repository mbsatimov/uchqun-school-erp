import { $api } from '@/utils/api/interceptor';

export type PostQuizParams = {
  title: string;
  description: string | null;
  isVisible: boolean;
  questions: Array<IQuestion>;
  startDateTime: string | null;
  endDateTime: string | null;
  duration: number | null;
};

type IQuestion = {
  pictureUrl: string | null;
  question: string;
  options: Array<IOption>;
  hint: string | null;
};

type IOption = {
  label: string;
  isCorrect: boolean;
};

export type PostQuizRequestConfig = RequestConfig<PostQuizParams>;

export const postQuiz = ({ params, config }: PostQuizRequestConfig) =>
  $api.post<PostQuizParams>('/quiz', params, config);
