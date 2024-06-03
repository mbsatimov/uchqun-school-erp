export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface ILoginRequest {
  login: string;
  password: string;
}
