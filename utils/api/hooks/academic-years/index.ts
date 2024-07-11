import { useMutation, useQuery } from '@tanstack/react-query';

import type {
  GetAcademicYearsRequest,
  PostAcademicYearsRequest,
  PutAcademicYearsIdRequest,
} from '@/utils/api';
import {
  getAcademicYears,
  postAcademicYears,
  putAcademicYearsId,
} from '@/utils/api';

export const GET_ACADEMIC_YEARS_QUERY_KEY = 'getAcademicYears';

export const useGetAcademicYearsQuery = (
  settings?: QuerySettings<GetAcademicYearsRequest, typeof getAcademicYears>
) =>
  useQuery({
    queryKey: [GET_ACADEMIC_YEARS_QUERY_KEY],
    queryFn: () => getAcademicYears(settings?.request),
    ...settings?.options,
  });

export const POST_ACADEMIC_YEARS_MUTATION_KEY = 'postAcademicYears';

export const usePostAcademicYearsMutation = (
  settings?: MutationSettings<
    PostAcademicYearsRequest,
    typeof postAcademicYears
  >
) =>
  useMutation({
    mutationKey: [POST_ACADEMIC_YEARS_MUTATION_KEY],
    mutationFn: postAcademicYears,
    ...settings?.options,
  });

export const PUT_ACADEMIC_YEARS_ID_MUTATION_KEY = 'putAcademicYearsId';

export const usePutAcademicYearsIdMutation = (
  settings?: MutationSettings<
    PutAcademicYearsIdRequest,
    typeof putAcademicYearsId
  >
) =>
  useMutation({
    mutationKey: [PUT_ACADEMIC_YEARS_ID_MUTATION_KEY],
    mutationFn: putAcademicYearsId,
    ...settings?.options,
  });
