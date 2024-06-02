'use client';
import { Loader2 } from 'lucide-react';

import { useSearch } from '@/hooks/use-search';
import { useGetAllUsers } from '@/hooks/use-user';
import { DefaultError } from '@/lib/exceptions/default-exception';

import { columns } from './_components/users-table/columns';
import { CreateUserModal } from './_components/create-user-modal';
import { UserTable } from './_components/users-table/user-table';

function UsersPage() {
  const users = useGetAllUsers();

  const { filteredData, inputValue, setInputValue } = useSearch({
    data: users.data || [],
    searchBy: ['name', 'surname', 'phoneNumber'],
  });

  if (users.isError) throw new DefaultError();

  if (users.data?.length === 0)
    return <p className="mt-10 text-center text-lg">No users found.</p>;

  return (
    <div className="space-y-6">
      <CreateUserModal />
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
