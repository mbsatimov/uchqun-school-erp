import { useMutation } from '@tanstack/react-query';

import type { PutLessonRequest } from '@/utils/api';
import { putLessonsId } from '@/utils/api';

export const PUT_LESSONS_ID_MUTATION_KEY = 'putLessonsId';

export const usePutLessonsIdMutation = (
  settings: MutationSettings<PutLessonRequest, typeof putLessonsId>
) =>
  useMutation({
    mutationKey: [PUT_LESSONS_ID_MUTATION_KEY],
    mutationFn: putLessonsId,
    ...settings.options,
  });
