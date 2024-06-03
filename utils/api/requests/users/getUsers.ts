import { $api } from '@/utils/api/interceptor';
export type GetUsersConfig = ApiRequestConfig;

export const getUsers = async (requestConfig?: GetUsersConfig) =>
  $api.get<UsersResponse>('users', requestConfig?.config);

export type PostUserParams = Omit<User, 'id'>;
export type PostUserConfig = ApiRequestConfig<PostUserParams>;

export const postUsers = async ({ params, config }: PostUserConfig) =>
  $api.post('user', params, config);
