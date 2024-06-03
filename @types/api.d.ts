interface ApiErrorResponse {
  message: string;
  errors: Array<unknown>;
}

type ApiRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { params: Params; config?: import('axios').AxiosRequestConfig };
