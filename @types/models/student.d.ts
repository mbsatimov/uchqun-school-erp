interface IStudent extends User {
  group: Group | null;
  attendance: Array<Attendance>;
}

interface IStudentPreview extends User {
  groupId: number | null;
}

interface IStudentWithGroup extends IStudent {
  group: Group;
}

interface IStudentWithGroupPreview extends IStudentPreview {
  groupId: number;
}

type TStudentRequest = Omit<
  IStudent,
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
