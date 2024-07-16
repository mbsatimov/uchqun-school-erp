import { useMutation, useQuery } from '@tanstack/react-query';

import {
  GetUserIdConfig,
  PutUserIdConfig,
  getUsersId,
  putUsersId,
} from '@/utils/api';

export const GET_USERS_ID_QUERY_KEY = 'getUsersId';

export const useGetUsersIdQuery = (
  settings: QuerySettings<GetUserIdConfig, typeof getUsersId>
) =>
  useQuery({
    queryKey: [GET_USERS_ID_QUERY_KEY, settings.request.id],
    queryFn: () => getUsersId(settings.request),
    ...settings.options,
  });

export const PUT_USERS_ID_MUTATION_KEY = 'putUsersId';

export const usePutUsersIdMutation = (
  settings?: MutationSettings<PutUserIdConfig, typeof putUsersId>
) =>
  useMutation({
    mutationKey: [PUT_USERS_ID_MUTATION_KEY],
    mutationFn: putUsersId,
    ...settings?.options,
  });
