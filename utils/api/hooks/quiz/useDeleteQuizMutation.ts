'use client';

import { useMutation } from '@tanstack/react-query';

import type { DeleteQuizRequestConfig } from '@/utils/api/requests';
import { deleteQuiz } from '@/utils/api/requests';

export const useDeleteQuizMutation = (
  settings?: MutationSettings<DeleteQuizRequestConfig, typeof deleteQuiz>
) => {
  return useMutation({
    mutationKey: ['deleteQuiz'],
    mutationFn: ({ id, config }) =>
      deleteQuiz({ id, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  });
};
