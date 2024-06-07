import { $api } from '@/utils/api/interceptor';

export type GetUserParams = {
  id: number;
};
export type GetUserConfig = RequestConfig<GetUserParams>;

export const getUsersId = ({ params, config }: GetUserConfig) =>
  $api.get<UserResponse>(`user/${params.id}`, config);
