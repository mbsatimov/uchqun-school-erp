type Portion = 'CHORAK_1' | 'CHORAK_2' | 'CHORAK_3' | 'CHORAK_4';

interface ISemesterPreview {
  id: number;
  startDate: string;
  endDate: string;
  academicYear: number;
  portion: Portion;
  present: boolean;
}

interface ISemester {
  id: number;
  startDate: string;
  endDate: string;
  academicYear: number;
  dailySchedules: Array<DailySchedule>;
  isPresent: boolean;
  portion: Portion;
}

interface ICreateSemesterRequest {
  startDate: string;
  endDate: string;
  portion: string;
}

interface IGenerateTimeTableRequest {
  groupId: number;
  semesterId: number;
  dailySchedules: Array<IDailyScheduleCreate>;
}

interface IUpdateSemesterRequest {
  id: number;
  data: ICreateSemesterRequest;
}
