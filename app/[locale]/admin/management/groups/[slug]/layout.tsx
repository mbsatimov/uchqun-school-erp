import { GroupHeader } from './_components/group-header';

function Layout({
  params: { slug: groupId },
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  return (
    <>
      <GroupHeader groupId={Number(groupId)} />
      {children}
    </>
  );
}

export default Layout;
