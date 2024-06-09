export const attendanceStatusColorsMap: Record<AttendanceStatus, string> = {
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
