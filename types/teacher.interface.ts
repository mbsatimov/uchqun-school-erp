import type { ICourse } from './course.interface';
import type { ISemester } from './semester.interface';
import type { IUser } from './user.interface';

export interface ITeacher extends IUser {
  courses: Array<ICourse>;
  semester: Array<ISemester>;
}

export interface ITeacherPreview extends IUser {}

type TTeacherRequest = Omit<
  ITeacher,
  'id' | 'courses' | 'semester' | 'attachment'
>;

export interface ICreateTeacherRequest extends TTeacherRequest {
  password: string;
}

export interface IUpdateTeacherRequest {
  id: number;
  data: TTeacherRequest & {
    oldPassword: string;
    newPassword: string;
  };
}
