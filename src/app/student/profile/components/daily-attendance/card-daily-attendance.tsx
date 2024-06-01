import { AttendanceHeatmap } from '@/components/attendance-heatmap/attendance-heatmap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CardDailyAttendance = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <AttendanceHeatmap />
      </CardContent>
    </Card>
  );
};
