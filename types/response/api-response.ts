import type { HttpStatusCode } from 'axios';

export interface IApiResponse {
  status: HttpStatusCode;
  message: string;
}
