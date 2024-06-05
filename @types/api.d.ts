interface QuerySettings<Func = unknown> {
  config?: ApiRequestConfig;
  options?: Omit<
    import('@tanstack/react-query').UseQueryOptions<
      Awaited<ReturnType<Func>>,
      ApiErrorResponse,
      Awaited<ReturnType<Func>>,
      any
    >,
    'queryKey'
  >;
}

interface MutationSettings<Params = void, Func = unknown> {
  config?: ApiRequestConfig;
  options?: import('@tanstack/react-query').UseMutationOptions<
    Awaited<ReturnType<Func>>,
    ApiErrorResponse,
    Params,
    any
  >;
}

interface ApiErrorResponse {
  message: string;
  httpStatus: number;
}

type ApiRequestConfig = import('axios').AxiosRequestConfig;

type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { params: Params; config?: import('axios').AxiosRequestConfig };
