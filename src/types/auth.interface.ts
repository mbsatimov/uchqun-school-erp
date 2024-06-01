import type { IUser } from './user.interface';

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ILoginRequest {
  login: string;
  password: string;
}
