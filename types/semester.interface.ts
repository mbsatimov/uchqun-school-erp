import type {
  IDailySchedule,
  IDailyScheduleCreate,
} from './daily-schedule.interface';

export enum EnumPortion {
  SEMESTER_1 = 'Semester 1',
  SEMESTER_2 = 'Semester 2',
  CHORAK_1 = 'Chorak 1',
  CHORAK_2 = 'Chorak 2',
  CHORAK_3 = 'Chorak 3',
  CHORAK_4 = 'Chorak 4',
}

export interface ISemesterPreview {
  id: number;
  startDate: string;
  endDate: string;
  academicYear: number;
  portion: keyof typeof EnumPortion;
  present: boolean;
}

export interface ISemester {
  id: number;
  startDate: string;
  endDate: string;
  academicYear: number;
  dailySchedules: Array<IDailySchedule>;
  isPresent: boolean;
  portion: keyof typeof EnumPortion;
}

export interface ICreateSemesterRequest {
  startDate: string;
  endDate: string;
  portion: string;
}

export interface IGenerateTimeTableRequest {
  groupId: number;
  semesterId: number;
  dailySchedules: Array<IDailyScheduleCreate>;
}

export interface IUpdateSemesterRequest {
  id: number;
  data: ICreateSemesterRequest;
}
