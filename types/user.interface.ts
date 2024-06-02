export interface Attachment {
  id: number;
  fileName: string;
  contentType: string;
  url: string;
}

export const enum EnumRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export interface IUser {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  attachment: Attachment | null;
  role: EnumRole;
}

export type TUserRequest = Omit<IUser, 'id' | 'attachment'>;

export interface ICreateUserRequest extends TUserRequest {
  password: string;
}
