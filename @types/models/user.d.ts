interface Attachment {
  id: number;
  fileName: string;
  contentType: string;
  url: string;
}

type Role = 'ADMIN' | 'TEACHER' | 'STUDENT';

interface User {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  attachment: Attachment | null;
  role: Role;
}

type TUserRequest = Omit<User, 'id' | 'attachment'>;

interface ICreateUserRequest extends TUserRequest {
  password: string;
}

type UsersResponse = Array<User>;
type UserResponse = User;
