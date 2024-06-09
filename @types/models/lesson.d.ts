type LessonStatus = 'COMPLETED' | 'SKIPPED' | 'UPCOMING';

interface LessonPreview {
  id: number;
  teacherName: string;
  courseName: string;
  groupName: string;
  startTime: string;
  endTime: string;
  lessonStatus: LessonStatus;
}

interface Lesson {
  id: number;
  course: CoursePreview;
  teacher: ITeacherPreview;
  startTime: string;
  endTime: string;
  attendances: Array<Attendance>;
  lessonStatus: LessonStatus;
}

type LessonsResponse = Array<LessonPreview>;
type LessonResponse = Lesson;

interface LessonRequest {
  courseId: number;
  teacherId: number;
  startTime: string;
  endTime: string;
}
