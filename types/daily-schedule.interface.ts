import type { ILessonCreate, ILessonPreview } from './lesson.interface';
import type { ISemester } from './semester.interface';

export enum EnumDay {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export interface IDailySchedule {
  id: number;
  courseDate: string;
  lessons: Array<ILessonPreview>;
  semester: ISemester;
  dayOfWeek: keyof typeof EnumDay;
}

export interface IDailyScheduleCreate {
  lessons: Array<ILessonCreate>;
  dayOfWeek: string;
}

export interface IUpdateDailyScheduleRequest {
  id: number;
  data: IDailyScheduleCreate;
}
