import type { AxiosResponse } from 'axios';

import { $api } from '@/utils/api/interceptor';

const DAILY_SCHEDULE_URL = '/daily-schedule';

export const DailyScheduleService = {
  async getAllInSemester(
    semesterId: number
  ): Promise<AxiosResponse<Array<DailySchedule>>> {
    return $api.get<Array<DailySchedule>>(
      `${DAILY_SCHEDULE_URL}/all/${semesterId}`
    );
  },

  async getByMonth({
    semesterId,
    month,
  }: {
    semesterId: number;
    month: number;
  }): Promise<AxiosResponse<Array<DailySchedule>>> {
    return $api.get<Array<DailySchedule>>(
      `${DAILY_SCHEDULE_URL}/month/${month}?semesterId=${semesterId}`
    );
  },

  async getBetweenDates({
    semesterId,
    startDate,
    endDate,
  }: {
    semesterId: number;
    startDate: Date;
    endDate: Date;
  }): Promise<AxiosResponse<Array<DailySchedule>>> {
    return $api.get<Array<DailySchedule>>(
      `${DAILY_SCHEDULE_URL}/between/${semesterId}?startDate=${startDate}&endDate=${endDate}`
    );
  },

  async getTeacherDailySchedules(
    teacherId: number,
    semesterId?: number
  ): Promise<AxiosResponse<Array<DailySchedule>>> {
    return $api.get<Array<DailySchedule>>(
      `${DAILY_SCHEDULE_URL}/teacher/${teacherId}/semester`,
      { params: { semesterId } }
    );
  },

  async getById(id: number): Promise<AxiosResponse<DailySchedule>> {
    return $api.get<DailySchedule>(`${DAILY_SCHEDULE_URL}/${id}`);
  },

  async getToday(groupId: number): Promise<AxiosResponse<DailySchedule>> {
    return $api.get<DailySchedule>(`${DAILY_SCHEDULE_URL}/today/${groupId}`);
  },

  async update(data: DailySchedule): Promise<AxiosResponse<DailySchedule>> {
    return $api.put<DailySchedule>('/schedule/update', data);
  },
};
