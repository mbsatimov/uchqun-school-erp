import { useMutation, useQuery } from '@tanstack/react-query';

import type { GetLessonsConfig, PostLessonRequest } from '@/utils/api';
import { getLessons, postLessons } from '@/utils/api';

export const GET_LESSONS_QUERY_KEY = 'getLessons';

export const useGetLessonsQuery = (
  settings?: QuerySettings<GetLessonsConfig, typeof getLessons>
) =>
  useQuery({
    queryKey: [GET_LESSONS_QUERY_KEY],
    queryFn: () => getLessons(settings?.request),
    select: ({ data }) => data,
    ...settings?.options,
  });

export const POST_LESSONS_MUTATION_KEY = 'postLessons';

export const usePostLessonsMutation = (
  settings?: MutationSettings<PostLessonRequest, typeof postLessons>
) =>
  useMutation({
    mutationKey: [POST_LESSONS_MUTATION_KEY],
    mutationFn: postLessons,
    ...settings?.options,
  });
