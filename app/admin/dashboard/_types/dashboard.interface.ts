import type { IGroup } from '@/types/group.interface';

export interface IOverallAttendance {
  date: string;
  total: number;
  present: number;
}

export interface IGroupStatistics {
  group: IGroup | null;
  percentage: number;
}
