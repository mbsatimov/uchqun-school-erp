import { useQuery } from '@tanstack/react-query';

import { GetUserConfig, getUsersId } from '@/utils/api';

export const GET_USERS_ID_QUERY_KEY = 'getUsersId';

export const useGetUsersIdQuery = (
  settings: QuerySettings<GetUserConfig, typeof getUsersId>
) =>
  useQuery({
    queryKey: [GET_USERS_ID_QUERY_KEY],
    queryFn: () => getUsersId(settings.request),
    ...settings.options,
  });
