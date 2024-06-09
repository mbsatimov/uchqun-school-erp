import { $api } from '@/utils/api';

export type GetUsersConfig = ApiRequest;

export const getUsers = (requestConfig?: GetUsersConfig) =>
  $api.get<UsersResponse>('users', requestConfig?.config);

type PostUserParams = { data: Omit<User, 'id'> };
export type PostUserConfig = ApiRequest<PostUserParams>;

export const postUsers = ({ data, config }: PostUserConfig) =>
  $api.post('users', data, config);
