type Day =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

interface IDailySchedule {
  id: number;
  courseDate: string;
  lessons: Array<ILessonPreview>;
  semester: ISemester;
  dayOfWeek: Day;
}

interface IDailyScheduleCreate {
  lessons: Array<ILessonCreate>;
  dayOfWeek: string;
}

interface IUpdateDailyScheduleRequest {
  id: number;
  data: IDailyScheduleCreate;
}
