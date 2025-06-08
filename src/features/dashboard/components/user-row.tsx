import { Edit2 } from 'lucide-react';
import type { User } from '../types/user.types';

interface UserRowProps {
    user: User;
    onEdit: () => void;
}

const UserRow = ({ user, onEdit }: UserRowProps) => {
    return (
        <tr className="hover:bg-gray-50/50 transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        <img
                            src={`/images.png`}
                            alt={`${user.firstName} ${user.lastName}`}
                        />
                    </div>
                    <span className="text-sm font-bold text-gray-800">
                        {user.firstName} {user.lastName}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 font-medium capitalize">
                {user.role}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
            <td className="px-6 py-4 text-sm text-gray-500">
                {user.tenant ? user.tenant.name : 'N/A'}
            </td>
            <td className="px-6 py-4">
                <button
                    onClick={onEdit}
                    className="p-2 text-gray-400 hover:text-[#ff5a3d] hover:bg-orange-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Edit User"
                >
                    <Edit2 size={16} />
                </button>
            </td>
        </tr>
    );
};

export default UserRow;
