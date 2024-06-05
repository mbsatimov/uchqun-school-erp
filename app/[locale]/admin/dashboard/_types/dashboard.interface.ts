export interface IOverallAttendance {
  date: string;
  total: number;
  present: number;
}

export interface IGroupStatistics {
  group: Group | null;
  percentage: number;
}
