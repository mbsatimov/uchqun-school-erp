import { $api } from '@/utils/api';

export type GetUsersConfig = ApiRequest;

export const getUsers = (request?: GetUsersConfig) =>
  $api.get<UsersResponse>('user', request?.config);

type PostUserParams = { data: UserRequest };
export type PostUserConfig = ApiRequest<PostUserParams>;

export const postUsers = ({ data, config }: PostUserConfig) =>
  $api.post<ApiSuccessResponse>('user', data, config);

type DeleteUsersParams = {
  data: { ids: Array<number> };
  params: { role: Role };
};
export type DeleteUserConfig = ApiRequest<DeleteUsersParams>;

export const deleteUsers = ({ data, config }: DeleteUserConfig) =>
  $api.delete<ApiSuccessResponse>('user', { data, ...config });
