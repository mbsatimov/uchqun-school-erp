import { useQuery } from '@tanstack/react-query';

import { DAILY_SCHEDULES_QUERY_KEY } from '@/lib/constants/query-keys';
import { DailyScheduleService } from '@/services/daily-schedule.service';

export const useGetDailySchedule = (id: number) => {
  return useQuery({
    queryKey: [DAILY_SCHEDULES_QUERY_KEY, id],
    queryFn: async () => {
      const res = await DailyScheduleService.getById(id);
      return res.data;
    },
  });
};

export const useGetTeacherDailySchedules = (
  teacherId: number,
  semesterId?: number
) => {
  return useQuery({
    queryKey: [DAILY_SCHEDULES_QUERY_KEY],
    queryFn: async () => {
      const res = await DailyScheduleService.getTeacherDailySchedules(
        teacherId,
        semesterId
      );
      return res.data;
    },
  });
};
