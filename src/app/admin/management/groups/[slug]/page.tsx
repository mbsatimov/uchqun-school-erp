import { AddStudentToGroupModal } from './_components/add-student-to-group-modal';
import { GroupStudents } from './_components/group-students';

function StudentsPage({
  params: { slug: groupId },
}: {
  params: { slug: string };
}) {
  return (
    <>
      <AddStudentToGroupModal groupId={Number(groupId)} />
      <GroupStudents groupId={Number(groupId)} />
    </>
  );
}

export default StudentsPage;
