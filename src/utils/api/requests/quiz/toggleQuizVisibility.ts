import { $api } from '@/utils/api/interceptor';

export type ToggleQuizVisibilityRequestConfig = RequestConfig & {
  id: number;
};

export const toggleQuizVisibility = ({
  id,
  config,
}: ToggleQuizVisibilityRequestConfig) =>
  $api.patch(`/quiz${id}/visible-toggle`, config);
