interface Student extends User {
  group: Group | null;
  attendance: Array<Attendance>;
}

interface StudentPreview extends User {
  groupId: number | null;
}

interface IStudentWithGroup extends Student {
  group: Group;
}

interface StudentWithGroupPreview extends StudentPreview {
  groupId: number;
}

type TStudentRequest = Omit<
  Student,
  'id' | 'group' | 'attendance' | 'attachment'
>;

interface ICreateStudentRequest extends TStudentRequest {
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

interface IUpdateStudentRequest extends TStudentRequest {
  oldPassword: string | null;
  newPassword: string | null;
}

interface IUpdateStudentGroupRequest {
  studentId: number;
  groupId: number;
}
