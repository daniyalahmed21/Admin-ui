import { useState, useEffect } from 'react';
import { useUsers } from '../api/users.api';
import UserForm from '../components/user-form';
import Modal from '../components/modal';
import FilterBar from '../components/filter-bar';
import UserTable from '../components/user-table';
import type { User } from '../types/user.types';

const UsersPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1); // Reset to first page on search
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Fetch users with filters
    const { data, isLoading, isError, error } = useUsers({
        q: debouncedSearch,
        role: selectedRole,
        currentPage,
        perPage,
    });

    const handleRoleChange = (role: string) => {
        setSelectedRole(role);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedUser(null);
    };

    const totalPages = data ? Math.ceil(data.total / data.perPage) : 0;

    return (
        <div className="space-y-6">
            {/* Breadcrumbs */}
            <nav className="text-xs font-medium text-gray-400 flex gap-2">
                <span>Dashboard</span>
                <span>&gt;</span>
                <span className="text-gray-600">Users</span>
            </nav>

            {/* User Form Modal (Create/Edit) */}
            <Modal isOpen={showForm} onClose={handleCloseForm}>
                <UserForm
                    onClose={handleCloseForm}
                    userToEdit={selectedUser}
                />
            </Modal>

            {/* Filter Bar */}
            <FilterBar
                searchTerm={searchTerm}
                selectedRole={selectedRole}
                onSearchChange={setSearchTerm}
                onRoleChange={handleRoleChange}
                onCreateClick={() => {
                    setSelectedUser(null);
                    setShowForm(true);
                }}
            />

            {/* Data Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <UserTable
                    users={data?.data || []}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    onEditUser={handleEditUser}
                />
            </div>
        </div>
    );
};

export default UsersPage;