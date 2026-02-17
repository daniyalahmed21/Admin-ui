import type { User } from '../types/user.types';

interface UserRowProps {
    user: User;
}

const UserRow = ({ user }: UserRowProps) => {
    return (
        <tr className="hover:bg-gray-50/50 transition-colors">
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
        </tr>
    );
};

export default UserRow;
