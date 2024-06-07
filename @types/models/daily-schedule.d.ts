type Day =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

interface DailySchedule {
  id: number;
  courseDate: string;
  lessons: Array<LessonPreview>;
  semester: ISemester;
  dayOfWeek: Day;
}

interface IDailyScheduleCreate {
  lessons: Array<LessonRequest>;
  dayOfWeek: string;
}

interface IUpdateDailyScheduleRequest {
  id: number;
  data: IDailyScheduleCreate;
}
