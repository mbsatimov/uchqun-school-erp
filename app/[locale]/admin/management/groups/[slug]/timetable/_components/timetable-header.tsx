import { initialDailySchedules } from './assign-semester-to-group-form';

export const TimetableHeader = () => {
  return (
    <div className="flex justify-between">
      {initialDailySchedules.map(day => (
        <div
          key={day.dayOfWeek}
          className="flex-1 border border-border p-2 text-center text-sm font-bold"
        >
          {day.dayOfWeek.substring(0, 3)}
        </div>
      ))}
    </div>
  );
};
