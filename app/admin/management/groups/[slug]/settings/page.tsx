'use client';
import { useRouter } from 'next/navigation';

import { useDeleteGroup, useDeleteGroupWithStudents } from '@/hooks/use-group';
import R from '@/lib/config/routes';
import { Button } from '@/components/ui/button';

function SettingsPage({
  params: { slug: groupId },
}: {
  params: { slug: string };
}) {
  const deleteGroup = useDeleteGroup();
  const deleteGroupWithStudents = useDeleteGroupWithStudents();
  const { push } = useRouter();

  const handleDeleteGroup = () => {
    deleteGroup.mutateAsync(Number(groupId)).then(() => {
      if (deleteGroup.isSuccess) push(R.ADMIN_GROUPS);
    });
  };

  const handleDeleteGroupWithStudents = () => {
    deleteGroupWithStudents.mutateAsync(Number(groupId)).then(() => {
      if (deleteGroupWithStudents.isSuccess) push(R.ADMIN_GROUPS);
    });
  };

  return (
    <div>
      <Button variant="destructive" onClick={handleDeleteGroup}>
        Delete Group
      </Button>
      <Button variant="destructive" onClick={handleDeleteGroupWithStudents}>
        Delete Group with Students
      </Button>
    </div>
  );
}

export default SettingsPage;
