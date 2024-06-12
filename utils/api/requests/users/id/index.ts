import { $api } from '@/utils/api/interceptor';

type GetUserParams = { id: number; params: { role: Role } };
export type GetUserConfig = ApiRequest<GetUserParams>;

export const getUsersId = ({ id, config }: GetUserConfig) =>
  $api.get<UserResponse>(`user/${id}`, config);

type PutUserParams = { id: number; data: UserRequest };
export type PutUserConfig = ApiRequest<PutUserParams>;

export const putUsersId = ({ id, data, config }: PutUserConfig) =>
  $api.put(`user/${id}`, data, config);

type DeleteUserParams = { id: number; params: { role: Role } };
export type DeleteUserConfig = ApiRequest<DeleteUserParams>;

export const deleteUsersId = ({ id, config }: DeleteUserConfig) =>
  $api.delete(`user/${id}`, config);
