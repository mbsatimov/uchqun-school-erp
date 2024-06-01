import type { IAttendance } from './attendance.interface';
import type { ICoursePreview } from './course.interface';
import type { ITeacherPreview } from './teacher.interface';

export type LessonStatus = 'COMPLETED' | 'SKIPPED' | 'UPCOMING';

export interface ILessonPreview {
  id: number;
  teacherName: string;
  courseName: string;
  groupName: string;
  startTime: string;
  endTime: string;
  lessonStatus: LessonStatus;
}

export interface ILesson {
  id: number;
  course: ICoursePreview;
  teacher: ITeacherPreview;
  startTime: string;
  endTime: string;
  attendances: Array<IAttendance>;
  lessonStatus: LessonStatus;
}

export interface ILessonCreate extends Pick<ILesson, 'startTime' | 'endTime'> {
  courseId: number;
  teacherId: number;
}
