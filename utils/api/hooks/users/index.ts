import { useMutation, useQuery } from '@tanstack/react-query';

import type { GetUsersConfig, PostUserConfig } from '@/utils/api';
import { getUsers, postUsers } from '@/utils/api';

export const GET_USERS_QUERY_KEY = 'getUsers';

export const useGetUsersQuery = (
  settings?: QuerySettings<GetUsersConfig, typeof getUsers>
) =>
  useQuery({
    queryKey: [GET_USERS_QUERY_KEY],
    queryFn: () => getUsers(settings?.request),
    ...settings?.options,
  });

export const POST_USERS_MUTATION_KEY = 'postUsers';

export const usePostUsersMutation = (
  settings?: MutationSettings<PostUserConfig, typeof postUsers>
) =>
  useMutation({
    mutationKey: [POST_USERS_MUTATION_KEY],
    mutationFn: postUsers,
    ...settings?.options,
  });
