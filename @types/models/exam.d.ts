type ExamStatus = 'UPCOMING' | 'PROGRESS' | 'FINISHED' | 'CANCELED';

interface IExam {
  id: number;
  name: string;
  attempt: number;
  startTime: string;
  endTime: string;
  status: ExamStatus;
  course: CoursePreview;
  teacher: ITeacherPreview;
  semester: ISemesterPreview;
  groups: Array<GroupPreview>;
}

interface IExamRequest {
  name: string;
  attempt: number;
  startTime: string;
  endTime: string;
  courseId: number;
  teacherId: number;
  semesterId: number;
  groupIds: Array<number>;
}
