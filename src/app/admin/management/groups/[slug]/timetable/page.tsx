import { GroupScheduleCalendar } from './_components/group-schedule-calendar';

function SemesterPage({
  params: { slug: groupId },
}: {
  params: { slug: string };
}) {
  return (
    <div className="space-y-4">
      <GroupScheduleCalendar groupId={Number(groupId)} />
    </div>
  );
}
export default SemesterPage;
