import { $api } from '@/utils/api/interceptor';

type GetUserParams = { id: number };
export type GetUserConfig = ApiRequest<GetUserParams>;

export const getUsersId = ({ id, config }: GetUserConfig) =>
  $api.get<UserResponse>(`user/${id}`, config);
