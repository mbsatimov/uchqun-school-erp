import type { ICourse } from './course.interface';
import type { IGroup } from './group.interface';
import type { ILessonPreview } from './lesson.interface';
import type { IStudentPreview } from './student.interface';

export type AttendanceStatus =
  | 'PRESENT'
  | 'LATE'
  | 'ABSENT'
  | 'EXCUSED'
  | 'UNKNOWN';

export interface IAttendance {
  id: number;
  status: AttendanceStatus;
  student: IStudentPreview;
  group: IGroup;
  course: ICourse;
  date: Date;
}

export interface IUpdateAttendancesRequest {
  id: number;
  status: AttendanceStatus;
  studentId: number;
  lessonId: number;
}

export interface IAttendanceOverview {
  present: number;
  absent: number;
  late: number;
  excused: number;
  percentage: number;
}

export interface ICourseAttendanceOverview {
  [courseName: string]: IAttendanceOverview;
}

export interface IStudentTodayAttendanceWithLesson extends ILessonPreview {
  status: AttendanceStatus;
}
