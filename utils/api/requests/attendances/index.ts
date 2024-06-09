import { $api } from '@/utils/api/interceptor';
type GetAttendancesParams = {
  params?: {
    query?: string;
    status?: AttendanceStatus;
    date?: string;
    page: number;
    size: number;
  };
};

export type GetAttendancesRequest = ApiRequest<GetAttendancesParams>;

export const getAttendances = ({ config }: GetAttendancesRequest) =>
  $api.get('attendance', config);
