interface QuerySettings<Params = undefined, Func = unknown> {
  request: ApiRequest<Params>;
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
  options?: import('@tanstack/react-query').UseMutationOptions<
    Awaited<ReturnType<Func>>,
    ApiErrorResponse,
    Params,
    any
  >;
}

interface ApiErrorResponse {
  data: {
    message: string;
    httpStatus: number;
  };
}

interface ApiConfig<Params = undefined>
  extends import('axios').AxiosRequestConfig {
  params: Params['params'];
}

type ApiRequest<Params = undefined> = Params extends undefined
  ? { config?: ApiConfig<Params> }
  : Omit<Params, 'params'> & { config?: ApiConfig<Params> };
