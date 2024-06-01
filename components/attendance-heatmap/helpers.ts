import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  isSameMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';

import type { IAttendanceRecord } from './heatmap.interface';

// Utility Functions
export const groupByMonth = (
  data: IAttendanceRecord
): Record<string, IAttendanceRecord> => {
  return Object.keys(data).reduce(
    (acc, date) => {
      const month = new Date(date).toLocaleString('default', { month: 'long' });
      if (!acc[month]) {
        acc[month] = {};
      }
      acc[month][date] = data[date];
      return acc;
    },
    {} as Record<string, IAttendanceRecord>
  );
};

export const getYearDataByMonth = (date: Date) => {
  const months = [];
  let currentDate = startOfYear(date); // Start from the beginning of the year

  for (let month = 0; month < 12; month++) {
    // Loop through each month
    const monthData = [];
    let startOfTheWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endOfTheMonth = endOfMonth(currentDate);

    while (startOfTheWeek <= endOfTheMonth) {
      const daysOfWeek = eachDayOfInterval({
        start: startOfTheWeek,
        end: addDays(startOfTheWeek, 6),
      }).filter(day => isSameMonth(day, currentDate)); // Keep only days within the current month

      monthData.push(daysOfWeek);
      startOfTheWeek = addDays(startOfTheWeek, 7); // Move to the next week
    }

    months.push(monthData);
    currentDate = addDays(endOfTheMonth, 1); // Move to the next month
  }

  return months;
};
