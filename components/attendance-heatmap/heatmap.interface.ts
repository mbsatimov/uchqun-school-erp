export interface IAttendanceRecord {
  [date: string]: Array<{
    courseName: string;
    status: AttendanceStatus;
  }>;
}
