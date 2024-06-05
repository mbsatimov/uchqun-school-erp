import { $api } from '@/utils/api';

type GetUsersConfig = RequestConfig;

export const getUsers = (requestConfig?: GetUsersConfig) =>
  $api.get<UsersResponse>('users', requestConfig?.config);

type PostUserParams = Omit<User, 'id'>;
export type PostUserConfig = RequestConfig<PostUserParams>;

export const postUsers = ({ params, config }: PostUserConfig) =>
  $api.post('users', params, config);
