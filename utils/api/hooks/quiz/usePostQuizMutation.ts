import { useMutation } from '@tanstack/react-query';

import type { PostQuizRequestConfig } from '@/utils/api/requests';
import { postQuiz } from '@/utils/api/requests';

export const usePostQuizMutation = (
  settings?: MutationSettings<PostQuizRequestConfig, typeof postQuiz>
) =>
  useMutation({
    mutationKey: ['postQuiz'],
    mutationFn: ({ params, config }) =>
      postQuiz({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  });
