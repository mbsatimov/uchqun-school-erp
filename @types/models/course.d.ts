interface Course {
  id: number;
  name: string;
  teachers: Array<ITeacher>;
  semesters: Array<ISemester>;
}

interface CoursePreview {
  id: number;
  name: string;
}

type CourseRequest = Omit<Course, 'id' | 'teachers' | 'semesters'>;

interface IUpdateCourseRequest {
  id: number;
  data: CourseRequest;
}
