import { $api } from '@/utils/api/interceptor';

type GetUserIdParams = { id: number; params: { role: Role } };
export type GetUserIdConfig = ApiRequest<GetUserIdParams>;

export const getUsersId = ({ id, config }: GetUserIdConfig) =>
  $api.get<UserResponse>(`user/${id}`, config);

type PutUserIdParams = { id: number; data: UserRequest };
export type PutUserIdConfig = ApiRequest<PutUserIdParams>;

export const putUsersId = ({ id, data, config }: PutUserIdConfig) =>
  $api.put(`user/${id}`, data, config);

type DeleteUserIdParams = { id: number; params: { role: Role } };
export type DeleteUserIdConfig = ApiRequest<DeleteUserIdParams>;

export const deleteUsersId = ({ id, config }: DeleteUserIdConfig) =>
  $api.delete(`user/${id}`, config);
