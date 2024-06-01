'use client';

import { useQuery } from '@tanstack/react-query';

import { DashboardService } from '@/app/admin/dashboard/_api/dashboard.service';
import { DASHBOARD_QUERY_KEY } from '@/lib/constants/query-keys';

export const useGetTotalStudentsCount = () => {
  return useQuery({
    queryKey: [DASHBOARD_QUERY_KEY, 'total-students-count'],
    queryFn: DashboardService.getTotalStudentsCount,
    select: ({ data }) => data,
  });
};

export const useGetTodayAttendanceCount = () => {
  return useQuery({
    queryKey: [DASHBOARD_QUERY_KEY, 'today-attendances'],
    queryFn: DashboardService.getTodayAttendanceCount,
    select: ({ data }) => data,
  });
};

export const useGetGroupWithHighestAttendance = () => {
  return useQuery({
    queryKey: [DASHBOARD_QUERY_KEY, 'group-with-highest-attendances'],
    queryFn: DashboardService.getGroupWithHighestAttendance,
    select: ({ data }) => data,
  });
};

export const useGetGroupWithLowestAttendance = () => {
  return useQuery({
    queryKey: [DASHBOARD_QUERY_KEY, 'group-with-lowest-attendances'],
    queryFn: DashboardService.getGroupWithLowestAttendance,
    select: ({ data }) => data,
  });
};

export const useGetOverallAttendance = () => {
  return useQuery({
    queryKey: [DASHBOARD_QUERY_KEY, 'overall-attendances'],
    queryFn: DashboardService.getOverallAttendance,
    select: ({ data }) => data,
  });
};
