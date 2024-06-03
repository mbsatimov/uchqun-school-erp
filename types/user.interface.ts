export interface Attachment {
  id: number;
  fileName: string;
  contentType: string;
  url: string;
}

export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface User {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  attachment: Attachment | null;
  role: Role;
}

export type TUserRequest = Omit<User, 'id' | 'attachment'>;

export interface ICreateUserRequest extends TUserRequest {
  password: string;
}
