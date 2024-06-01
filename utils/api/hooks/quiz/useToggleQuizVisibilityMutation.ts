import { useMutation } from '@tanstack/react-query';

import type { ToggleQuizVisibilityRequestConfig } from '@/utils/api/requests';
import { toggleQuizVisibility } from '@/utils/api/requests';

export const useToggleQuizVisibilityMutation = (
  settings?: MutationSettings<
    ToggleQuizVisibilityRequestConfig,
    typeof toggleQuizVisibility
  >
) => {
  useMutation({
    mutationKey: ['postQuiz'],
    mutationFn: ({ id, config }) =>
      toggleQuizVisibility({ id, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  });
};
