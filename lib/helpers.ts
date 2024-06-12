import {
  addDays,
  addMonths,
  addYears,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';

// Helper functions for date manipulation
export const getStartOfWeek = (date: Date) => {
  return startOfWeek(date, { weekStartsOn: 1 });
};

export const getStartOfMonth = (date: Date) => {
  return startOfMonth(date);
};

export const getWeeks = (date: Date) => {
  const weeks = [];
  let startDate = getStartOfMonth(date);
  const endDate = addMonths(startDate, 1);

  while (startDate.getDay() !== 1) {
    startDate = addDays(startDate, -1);
  }

  while (startDate < endDate) {
    const week = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
    weeks.push(week);
    startDate = addDays(startDate, 7);
  }
  return weeks;
};

export const getMonths = (date: Date) => {
  const months = [];

  let startDate = startOfYear(date);
  const endDate = addYears(startDate, 1);

  while (startDate < endDate) {
    months.push(startDate);
    startDate = addMonths(startDate, 1);
  }
  return months;
};

// Helper functions for file manipulation
export const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = error => {
      reject(error);
    };
  });
};

// Helper map for colors manipulation for lessons status

export const LessonStatusColorsMap: Record<LessonStatus, string> = {
  COMPLETED: 'bg-present hover:bg-present',
  SKIPPED: 'bg-absent hover:bg-absent',
  UPCOMING: 'bg-excused hover:bg-excused',
};

// Helper map for colors manipulation for students status

export const AttendanceStatusColorsMap: Record<AttendanceStatus, string> = {
  PRESENT:
    'bg-present/30 hover:bg-present/50 border border-green-500 text-foreground',
  ABSENT:
    'bg-absent/30 hover:bg-absent/50 border border-red-500 text-foreground',
  EXCUSED:
    'bg-excused/30 hover:bg-excused/50 border border-blue-500 text-foreground',
  UNKNOWN:
    'bg-unknown/30 hover:bg-unknown/50 border border-gray-500 text-foreground',
  LATE: 'bg-late/30 hover:bg-late/50 border border-yellow-500 text-foreground',
};

export const phoneFormat = (phoneNumber: string) => {
  if (!phoneNumber) return;
  return phoneNumber.replace(
    /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
    '$1 ($2) $3-$4-$5'
  );
};
