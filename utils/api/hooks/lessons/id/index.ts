import { useMutation } from '@tanstack/react-query';

import { PutLessonConfig, putLesson } from '@/utils/api';

export const usePutLessonMutation = (
  settings?: MutationSettings<PutLessonConfig, typeof putLesson>
) =>
  useMutation({
    mutationKey: ['putLesson'],
    mutationFn: putLesson,
    ...settings?.options,
  });
