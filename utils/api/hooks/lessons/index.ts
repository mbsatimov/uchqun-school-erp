import { useMutation, useQuery } from '@tanstack/react-query';

import { PostLessonConfig, getLessons, postLessons } from '@/utils/api';

export const useGetLessonsQuery = (
  settings?: QuerySettings<typeof getLessons>
) =>
  useQuery({
    queryKey: ['getLessons'],
    queryFn: () => getLessons({ config: settings?.config }),
    ...settings?.options,
  });

export const usePostLessonsMutation = (
  settings?: MutationSettings<PostLessonConfig, typeof postLessons>
) =>
  useMutation({
    mutationKey: ['postLessons'],
    mutationFn: postLessons,
    ...settings?.options,
  });
