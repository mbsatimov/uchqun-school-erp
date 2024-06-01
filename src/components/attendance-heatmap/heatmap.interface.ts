import type { AttendanceStatus } from '@/types/attendance.interface';

export interface IAttendanceRecord {
  [date: string]: Array<{
    courseName: string;
    status: AttendanceStatus;
  }>;
}
