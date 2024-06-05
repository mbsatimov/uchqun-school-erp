import { useMutation, useQuery } from '@tanstack/react-query';

import { PostUserConfig, getUsers, postUsers } from '@/utils/api';

export const useGetUsersQuery = (settings?: QuerySettings<typeof getUsers>) =>
  useQuery({
    queryKey: ['getUsers'],
    queryFn: () => getUsers({ config: settings?.config }),
    ...settings?.options,
  });

export const usePostUsersMutation = (
  settings?: MutationSettings<PostUserConfig, typeof postUsers>
) =>
  useMutation({
    mutationKey: ['postUsers'],
    mutationFn: postUsers,
    ...settings?.options,
  });
