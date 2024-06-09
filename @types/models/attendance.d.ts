type AttendanceStatus = 'PRESENT' | 'LATE' | 'ABSENT' | 'EXCUSED' | 'UNKNOWN';

interface Attendance {
  id: number;
  status: AttendanceStatus;
  student: StudentPreview;
  date: Date;
  group: Group;
  course: Course;
  grade: number | null;
  comment: string | null;
}

interface StudentAttendance {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  status: AttendanceStatus;
  date: string;
  grade: number | null;
  comment: string | null;
  absentId: number | null;
  absentStatus: 'CHECKED' | 'UNCHECKED';
  absentComment: string | null;
}

interface AttendancesRequest {
  id: number;
  status: AttendanceStatus;
  grade?: number | null;
  comment?: string | null;
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

interface StudentTodayAttendanceWithLesson extends LessonPreview {
  status: AttendanceStatus;
  grade: number | null;
  comment: string | null;
}
