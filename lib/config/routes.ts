const ADMIN = '/admin';
const ADMIN_M = `${ADMIN}/management`;

const TEACHER = '/teacher';
const TEACHER_M = `${TEACHER}/management`;

const STUDENT = '/student';

const ROUTES = {
  // HOME
  HOME: '/',

  // ADMIN
  ADMIN_DASHBOARD: `${ADMIN}/dashboard`,
  ADMIN_PROFILE: `${ADMIN}/profile`,
  ADMIN_SETTINGS: `${ADMIN}/settings`,

  // ADMIN MANAGEMENT
  ADMIN_MANAGEMENT: ADMIN_M,
  ADMIN_GROUPS: `${ADMIN_M}/groups`,
  ADMIN_GROUP: (groupId: number | string) => `${ADMIN_M}/groups/${groupId}`,
  ADMIN_GROUP_TIMETABLE: (groupId: number | string) =>
    `${ADMIN_M}/groups/${groupId}/timetable`,
  ADMIN_COURSES: `${ADMIN_M}/courses`,
  ADMIN_TEACHERS: `${ADMIN_M}/teachers`,
  ADMIN_STUDENTS: `${ADMIN_M}/students`,
  ADMIN_SEMESTERS: `${ADMIN_M}/semesters`,
  ADMIN_USERS: `${ADMIN_M}/users`,

  // TEACHER
  TEACHER_LESSONS: `${TEACHER}/lessons`,
  TEACHER_LESSON: (lessonId: number | string) =>
    `${TEACHER}/lessons/${lessonId}`,
  TEACHER_SCHEDULE: `${TEACHER}/schedule`,
  TEACHER_SETTINGS: `${TEACHER}/settings`,
  TEACHER_PROFILE: `${TEACHER}/profile`,

  // TEACHER MANAGEMENT
  TEACHER_MANAGEMENT: TEACHER_M,

  TEACHER_QUIZZES: `${TEACHER_M}/quizzes`,
  TEACHER_NEW_QUIZ: `${TEACHER_M}/quizzes/new`,
  TEACHER_QUIZ: (quizId: number | string) => `${TEACHER_M}/quizzes/${quizId}`,

  TEACHER_EXAMS: `${TEACHER_M}/exams`,
  TEACHER_NEW_EXAM: `${TEACHER_M}/exams/new`,
  TEACHER_EXAM: (examId: number | string) => `${TEACHER_M}/exams/${examId}`,

  TEACHER_HOMEWORKS: `${TEACHER_M}/homeworks`,
  TEACHER_NEW_HOMEWORK: `${TEACHER_M}/homeworks/new`,
  TEACHER_HOMEWORK: (homeworkId: number | string) =>
    `${TEACHER_M}/homeworks/${homeworkId}`,

  TEACHER_ONLINE_LESSONS: `${TEACHER_M}/online`,
  TEACHER_NEW_ONLINE_LESSON: `${TEACHER_M}/online/new`,
  TEACHER_ONLINE_LESSON: (onlineId: number | string) =>
    `${TEACHER_M}/online/${onlineId}`,

  // STUDENT
  STUDENT_LESSONS: `${STUDENT}/lessons`,
  STUDENT_SCHEDULE: `${STUDENT}/schedule`,
  STUDENT_SETTINGS: `${STUDENT}/settings`,
  STUDENT_PROFILE: `${STUDENT}/profile`,
  STUDENT_QUIZZES: `${STUDENT}/quizzes`,
  STUDENT_QUIZ: (quizId: number | string) => `${STUDENT}/quizzes/${quizId}`,
  STUDENT_QUIZ_RESULTS: (quizId: number | string) =>
    `${STUDENT}/quizzes/${quizId}/results`,
};

export default ROUTES;