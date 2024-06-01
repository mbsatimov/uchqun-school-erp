import type { AxiosResponse } from 'axios';

import type { IAttendanceRecord } from '@/components/attendance-heatmap/heatmap.interface';
import type {
  IAttendanceOverview,
  ICourseAttendanceOverview,
  IStudentTodayAttendanceWithLesson,
  IUpdateAttendancesRequest,
} from '@/types/attendance.interface';
import type { IApiResponse } from '@/types/response/api-response';
import { $api } from '@/utils/api/interceptor';

const ATTENDANCE_URL = '/attendance';

export const AttendanceService = {
  async getStudentSemesterAttendanceStatistics(
    studentId: number
  ): Promise<AxiosResponse<IAttendanceOverview>> {
    return $api.get<IAttendanceOverview>(
      `${ATTENDANCE_URL}/student/${studentId}/semester-statistics`
    );
  },

  async getStudentTodayLessonsStatistics(
    studentId: number
  ): Promise<AxiosResponse<Array<IStudentTodayAttendanceWithLesson>>> {
    return $api.get<Array<IStudentTodayAttendanceWithLesson>>(
      `${ATTENDANCE_URL}/student/${studentId}/daily-statistics`
    );
  },

  async update(
    data: Array<IUpdateAttendancesRequest>
  ): Promise<AxiosResponse<IApiResponse>> {
    return $api.put<IApiResponse>(`${ATTENDANCE_URL}`, data);
  },

  async getStudentSemesterAttendanceForEachSubject({
    studentId,
    semesterId,
  }: {
    studentId: number;
    semesterId?: number;
  }): Promise<AxiosResponse<ICourseAttendanceOverview>> {
    return $api.get<ICourseAttendanceOverview>(
      `${ATTENDANCE_URL}/student/${studentId}/semester-statistics-from-each-subject`,
      { params: { semesterId } }
    );
  },

  async getStudentHeatmapStatistics({
    studentId,
    semesterId,
  }: {
    studentId: number;
    semesterId?: number;
  }): Promise<AxiosResponse<IAttendanceRecord>> {
    return $api.get<IAttendanceRecord>(
      `${ATTENDANCE_URL}/student/${studentId}/heatmap-statistics`,
      { params: { semesterId } }
    );
  },
};
