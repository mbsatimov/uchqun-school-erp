'use client';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSearch } from '@/hooks/use-search';
import { useGetAllUsers } from '@/hooks/use-user';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { cn } from '@/lib/utils';

import { UserModal } from './_components/user-modal';
import { columns } from './_components/users-table/columns';
import { UserTable } from './_components/users-table/user-table';

function UsersPage() {
  const users = useGetAllUsers();
  const [openStudent, setOpenStudent] = useState(false);
  const [openTeacher, setOpenTeacher] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);

  const { filteredData, inputValue, setInputValue } = useSearch({
    data: users.data || [],
    searchBy: ['name', 'surname', 'phoneNumber'],
  });

  if (users.isError) throw new DefaultError();

  if (users.data?.length === 0)
    return <p className="mt-10 text-center text-lg">No users found.</p>;

  return (
    <div className="space-y-6">
      <Card
        tabIndex={1}
        className={cn(
          'group relative flex w-[40px] items-center justify-center transition-all hover:w-fit'
        )}
      >
        <Plus className="absolute bottom-1/2 left-0 z-30 h-10 w-10 translate-y-1/2 cursor-pointer p-2 transition-all group-hover:rotate-45" />
        <div className="invisible ml-8 translate-x-[-20%] whitespace-nowrap opacity-0 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100">
          <Button variant={'ghost'} onClick={() => setOpenStudent(true)}>
            Student
          </Button>
          <UserModal
            role={'STUDENT'}
            open={openStudent}
            setOpen={setOpenStudent}
          />
          <Button variant={'ghost'} onClick={() => setOpenTeacher(true)}>
            Teacher
          </Button>
          <UserModal
            role={'TEACHER'}
            open={openTeacher}
            setOpen={setOpenTeacher}
          />
          <Button variant={'ghost'} onClick={() => setOpenAdmin(true)}>
            Admin
          </Button>
          <UserModal role={'ADMIN'} open={openAdmin} setOpen={setOpenAdmin} />
        </div>
      </Card>
      {users.isLoading ? (
        <div className="flex items-center justify-center pt-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <UserTable
          data={filteredData}
          columns={columns}
          searchValue={inputValue}
          setSearchValue={setInputValue}
        />
      )}
    </div>
  );
}

export default UsersPage;
