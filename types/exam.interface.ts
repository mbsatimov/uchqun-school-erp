import type { ICoursePreview } from './course.interface';
import type { IGroupPreview } from './group.interface';
import type { ISemesterPreview } from './semester.interface';
import type { ITeacherPreview } from './teacher.interface';

type ExamStatus = 'UPCOMING' | 'PROGRESS' | 'FINISHED' | 'CANCELED';

export interface IExam {
  id: number;
  name: string;
  attempt: number;
  startTime: string;
  endTime: string;
  status: ExamStatus;
  course: ICoursePreview;
  teacher: ITeacherPreview;
  semester: ISemesterPreview;
  groups: Array<IGroupPreview>;
}

export interface IExamRequest {
  name: string;
  attempt: number;
  startTime: string;
  endTime: string;
  courseId: number;
  teacherId: number;
  semesterId: number;
  groupIds: Array<number>;
}
