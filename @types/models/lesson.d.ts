type LessonStatus = 'COMPLETED' | 'SKIPPED' | 'UPCOMING';

interface ILessonPreview {
  id: number;
  teacherName: string;
  courseName: string;
  groupName: string;
  startTime: string;
  endTime: string;
  lessonStatus: LessonStatus;
}

interface ILesson {
  id: number;
  course: CoursePreview;
  teacher: ITeacherPreview;
  startTime: string;
  endTime: string;
  attendances: Array<Attendance>;
  lessonStatus: LessonStatus;
}

interface ILessonCreate extends Pick<ILesson, 'startTime' | 'endTime'> {
  courseId: number;
  teacherId: number;
}
