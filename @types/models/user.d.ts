interface User {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  attachment: Attachment | null;
  role: Role;
}

type Role = 'ADMIN' | 'TEACHER' | 'STUDENT';

interface Attachment {
  id: number;
  url: string;
}

type UserRequest = {
  name: string;
  surname: string;
  phoneNumber: string;
  role: Role;
};

type UsersResponse = Array<User>;
type UserResponse = User;
