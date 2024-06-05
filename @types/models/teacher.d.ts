interface ITeacher extends User {
  courses: Array<Course>;
  semester: Array<ISemester>;
}

interface ITeacherPreview extends User {}

type TTeacherRequest = Omit<
  ITeacher,
  'id' | 'courses' | 'semester' | 'attachment'
>;

interface ICreateTeacherRequest extends TTeacherRequest {
  password: string;
}

interface IUpdateTeacherRequest {
  id: number;
  data: TTeacherRequest & {
    oldPassword: string;
    newPassword: string;
  };
}
