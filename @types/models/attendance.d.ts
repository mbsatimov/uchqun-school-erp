type AttendanceStatus = 'PRESENT' | 'LATE' | 'ABSENT' | 'EXCUSED' | 'UNKNOWN';

interface Attendance {
  id: number;
  status: AttendanceStatus;
  student: IStudentPreview;
  date: Date;
  group: Group;
  course: Course;
  grade: number;
  comment: string;
  absentReason: string;
}

interface AttendancesRequest {
  id: number;
  status: AttendanceStatus;
  studentId: number;
  lessonId: number;
}

interface AttendanceOverview {
  present: number;
  absent: number;
  late: number;
  excused: number;
  percentage: number;
}

interface CourseAttendanceOverview {
  [courseName: string]: AttendanceOverview;
}

interface StudentTodayAttendanceWithLesson extends ILessonPreview {
  status: AttendanceStatus;
}
