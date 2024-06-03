import type { IAttendance } from './attendance.interface';
import type { IGroup } from './group.interface';

export interface IStudent extends User {
  group: IGroup | null;
  attendance: Array<IAttendance>;
}

export interface IStudentPreview extends User {
  groupId: number | null;
}

export interface IStudentWithGroup extends IStudent {
  group: IGroup;
}

export interface IStudentWithGroupPreview extends IStudentPreview {
  groupId: number;
}

export type TStudentRequest = Omit<
  IStudent,
  'id' | 'group' | 'attendance' | 'attachment'
>;

export interface ICreateStudentRequest extends TStudentRequest {
  password: string;
}

export interface ICreateStudentAndAddToGroupRequest {
  groupId: number;
  data: ICreateStudentRequest;
}

export interface ICreateStudentAndAddToGroupByFileRequest {
  groupId: number;
  data: FormData;
}

export interface IUpdateStudentRequest extends TStudentRequest {
  oldPassword: string | null;
  newPassword: string | null;
}

export interface IUpdateStudentGroupRequest {
  studentId: number;
  groupId: number;
}
