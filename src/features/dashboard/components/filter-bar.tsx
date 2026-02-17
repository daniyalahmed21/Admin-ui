import { Search, Plus } from 'lucide-react';

interface FilterBarProps {
    searchTerm: string;
    selectedRole: string;
    onSearchChange: (value: string) => void;
    onRoleChange: (value: string) => void;
    onCreateClick: () => void;
}

const FilterBar = ({
    searchTerm,
    selectedRole,
    onSearchChange,
    onRoleChange,
    onCreateClick,
}: FilterBarProps) => {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
            <div className="relative flex-grow max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                />
            </div>

            <select
                value={selectedRole}
                onChange={(e) => onRoleChange(e.target.value)}
                className="bg-gray-50 border-none rounded-lg text-sm px-4 py-2 text-gray-500 outline-none cursor-pointer"
            >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="customer">Customer</option>
            </select>

            <button
                onClick={onCreateClick}
                className="ml-auto bg-[#ff5a3d] hover:bg-[#e54e35] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
            >
                <Plus size={18} /> Create users
            </button>
        </div>
    );
};

export default FilterBar;
