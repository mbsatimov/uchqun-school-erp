import { useQuery } from '@tanstack/react-query';

import { GetUserParams, getUsersId } from '@/utils/api';

type UseGetUserIdQueryParams = {
  params: GetUserParams;
  settings?: QuerySettings<typeof getUsersId>;
};

export const useGetUsersIdQuery = ({
  params,
  settings,
}: UseGetUserIdQueryParams) =>
  useQuery({
    queryKey: ['getUserId'],
    queryFn: () => getUsersId({ params }),
    ...settings?.options,
  });
