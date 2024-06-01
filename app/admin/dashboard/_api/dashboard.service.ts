import type { AxiosResponse } from 'axios';

import type {
  IGroupStatistics,
  IOverallAttendance,
} from '@/app/admin/dashboard/_types/dashboard.interface';
import { $api } from '@/utils/api/interceptor';

const DASHBOARD_URL = '/dashboard';

export const DashboardService = {
  async getTotalStudentsCount(): Promise<AxiosResponse<number>> {
    return $api.get<number>(`${DASHBOARD_URL}/total-number-of-students`);
  },

  async getTodayAttendanceCount(): Promise<AxiosResponse<number>> {
    return $api.get<number>(`${DASHBOARD_URL}/daily-attendance`);
  },

  async getGroupWithHighestAttendance(): Promise<
    AxiosResponse<IGroupStatistics | null>
  > {
    return $api.get<IGroupStatistics | null>(
      `${DASHBOARD_URL}/highest-group-attendance`
    );
  },

  async getGroupWithLowestAttendance(): Promise<
    AxiosResponse<IGroupStatistics | null>
  > {
    return $api.get<IGroupStatistics | null>(
      `${DASHBOARD_URL}/lowest-group-attendance`
    );
  },

  async getOverallAttendance(): Promise<
    AxiosResponse<Array<IOverallAttendance>>
  > {
    return $api.get<Array<IOverallAttendance>>(
      `${DASHBOARD_URL}/graph-statistics`
    );
  },
};
