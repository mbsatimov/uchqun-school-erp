import { useQuery } from '@tanstack/react-query';

import { GetAttendancesRequest, getAttendances } from '@/utils/api';

export const GET_ATTENDANCES_QUERY_KEY = 'getAttendances';

export const useGetAttendancesQuery = (
  settings?: QuerySettings<GetAttendancesRequest, typeof getAttendances>
) =>
  useQuery({
    queryKey: [GET_ATTENDANCES_QUERY_KEY],
    queryFn: () => getAttendances(settings?.request),
    ...settings?.options,
  });
