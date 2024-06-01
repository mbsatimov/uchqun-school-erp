import type { ISemester } from './semester.interface';
import type { ITeacher } from './teacher.interface';

export interface ICourse {
  id: number;
  name: string;
  teachers: Array<ITeacher>;
  semesters: Array<ISemester>;
}

export interface ICoursePreview {
  id: number;
  name: string;
}

type TCourseRequest = Omit<ICourse, 'id' | 'teachers' | 'semesters'>;

export interface ICreateCourseRequest extends TCourseRequest {}

export interface IUpdateCourseRequest {
  id: number;
  data: TCourseRequest;
}
