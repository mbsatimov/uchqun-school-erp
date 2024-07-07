type StudentStatus = 'ACTIVE' | 'INACTIVE';

interface Student extends User {
  group: Group | null;
  attendance: Array<Attendance>;
  status?: StudentStatus;
}

interface StudentPreview extends User {
  groupId: number | null;
}

interface StudentWithGroup extends Student {
  group: Group;
}

interface StudentWithGroupPreview extends StudentPreview {
  groupId: number;
}

type StudentRequest = UserRequest;

interface ICreateStudentRequest extends StudentRequest {
  password: string;
}

interface ICreateStudentAndAddToGroupRequest {
  groupId: number;
  data: ICreateStudentRequest;
}

interface ICreateStudentAndAddToGroupByFileRequest {
  groupId: number;
  data: FormData;
}

interface IUpdateStudentRequest extends StudentRequest {
  oldPassword: string | null;
  newPassword: string | null;
}

interface IUpdateStudentGroupRequest {
  studentId: number;
  groupId: number;
}
