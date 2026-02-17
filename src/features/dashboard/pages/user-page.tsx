import { useState, useEffect } from 'react';
import { useUsers } from '../api/users.api';
import CreateUserForm from '../components/create-user-form';
import Modal from '../components/modal';
import FilterBar from '../components/filter-bar';
import UserTable from '../components/user-table';

const UsersPage = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
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

    const totalPages = data ? Math.ceil(data.total / data.perPage) : 0;

    return (
        <div className="space-y-6">
            {/* Breadcrumbs */}
            <nav className="text-xs font-medium text-gray-400 flex gap-2">
                <span>Dashboard</span>
                <span>&gt;</span>
                <span className="text-gray-600">Users</span>
            </nav>

            {/* Create User Form Modal */}
            <Modal isOpen={showCreateForm} onClose={() => setShowCreateForm(false)}>
                <CreateUserForm onClose={() => setShowCreateForm(false)} />
            </Modal>

            {/* Filter Bar */}
            <FilterBar
                searchTerm={searchTerm}
                selectedRole={selectedRole}
                onSearchChange={setSearchTerm}
                onRoleChange={handleRoleChange}
                onCreateClick={() => setShowCreateForm(true)}
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
                />
            </div>
        </div>
    );
};

export default UsersPage;