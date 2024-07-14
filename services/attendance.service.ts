import type { IAttendanceRecord } from '@/components/attendance-heatmap/heatmap.interface';
import { $api } from '@/utils/api/interceptor';

const ATTENDANCE_URL = '/attendance';

export const AttendanceService = {
  async getStudentSemesterAttendanceStatistics() {
    return $api.get<AttendanceOverview>(
      `${ATTENDANCE_URL}/student/semester-statistics`
    );
  },

  async getStudentTodayLessonsStatistics() {
    return $api.get<Array<StudentTodayAttendanceWithLesson>>(
      `${ATTENDANCE_URL}/student/daily-schedule`
    );
  },

  async update(data: Array<AttendancesRequest>) {
    return $api.put<ApiErrorResponse>(`${ATTENDANCE_URL}`, data);
  },

  async getStudentSemesterAttendanceForEachSubject({
    semesterId,
  }: {
    semesterId?: number;
  }) {
    return $api.get<CourseAttendanceOverview>(
      `${ATTENDANCE_URL}/student/semester-statistics-from-each-subject`,
      { params: { semesterId } }
    );
  },

  async getStudentHeatmapStatistics({ semesterId }: { semesterId?: number }) {
    return $api.get<IAttendanceRecord>(
      `${ATTENDANCE_URL}/student/heatmap-statistics`,
      { params: { semesterId } }
    );
  },
};
