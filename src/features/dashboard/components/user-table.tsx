import UserRow from './user-row';
import Pagination from './pagination';
import type { User } from '../types/user.types';

interface UserTableProps {
    users: User[];
    isLoading: boolean;
    isError: boolean;
    error: any;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onEditUser: (user: User) => void;
}

const UserTable = ({
    users,
    isLoading,
    isError,
    error,
    currentPage,
    totalPages,
    onPageChange,
    onEditUser,
}: UserTableProps) => {
    if (isLoading) {
        return (
            <div className="p-12 text-center">
                <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-[#ff5a3d] rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500 text-sm">Loading users...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-12 text-center">
                <p className="text-red-500 text-sm">
                    Error loading users: {error?.message || 'Unknown error'}
                </p>
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="p-12 text-center">
                <p className="text-gray-500 text-sm">No users found</p>
            </div>
        );
    }

    return (
        <>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider font-bold">
                        <th className="px-6 py-4">User Name</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Tenant</th>
                        <th className="px-6 py-4">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {users.map((user) => (
                        <UserRow key={user.id} user={user} onEdit={() => onEditUser(user)} />
                    ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </>
    );
};

export default UserTable;
