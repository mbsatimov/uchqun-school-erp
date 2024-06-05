interface Group {
  id: number;
  name: string;
  establishedDate: string;
  isActive: boolean;
  students: Array<IStudentWithGroupPreview>;
}

interface GroupPreview {
  id: number;
  name: string;
  establishedDate: string;
  numberOfStudents: number;
}

type GroupRequest = Pick<Group, 'name' | 'establishedDate'>;

interface IUpdateGroupRequest {
  id: number;
  data: GroupRequest;
}
