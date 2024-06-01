import type { IStudentWithGroupPreview } from './student.interface';

export interface IGroup {
  id: number;
  name: string;
  establishedDate: string;
  isActive: boolean;
  students: Array<IStudentWithGroupPreview>;
}

export interface IGroupPreview {
  id: number;
  name: string;
  establishedDate: string;
  numberOfStudents: number;
}

export type TGroupRequest = Pick<IGroup, 'name' | 'establishedDate'>;

export interface ICreateGroupRequest extends TGroupRequest {}

export interface IUpdateGroupRequest {
  id: number;
  data: TGroupRequest;
}
