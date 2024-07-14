import { useQuery } from '@tanstack/react-query';

import { GetLessonsTeacherRequest, getLessonsTeacher } from '@/utils/api';

export const GET_TEACHER_LESSONS_QUERY_KEY = 'getTeacherLessons';

export const useGetTeacherLessonsQuery = (
  settings: QuerySettings<GetLessonsTeacherRequest, typeof getLessonsTeacher>
) => {
  return useQuery({
    queryKey: [
      GET_TEACHER_LESSONS_QUERY_KEY,
      settings?.request.config?.params.date,
    ],
    queryFn: () => getLessonsTeacher(settings.request),
    ...settings?.options,
  });
};
