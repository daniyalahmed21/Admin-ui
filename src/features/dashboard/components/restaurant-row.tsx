import { Edit2, MapPin } from 'lucide-react';
import type { Tenant } from '../types/tenant.types';

interface RestaurantRowProps {
    tenant: Tenant;
    onEdit: () => void;
}

const RestaurantRow = ({ tenant, onEdit }: RestaurantRowProps) => {
    return (
        <tr className="hover:bg-gray-50/50 transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#ff5a3d] font-bold text-lg border border-orange-100">
                        {tenant.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <span className="block text-sm font-bold text-gray-800">
                            {tenant.name}
                        </span>
                        <span className="text-xs text-gray-400">ID: #{tenant.id}</span>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={14} className="text-gray-400 shrink-0" />
                    <span className="truncate max-w-[300px]">{tenant.address}</span>
                </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-400">
                {new Date(tenant.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">
                <button
                    onClick={onEdit}
                    className="p-2 text-gray-400 hover:text-[#ff5a3d] hover:bg-orange-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Edit Restaurant"
                >
                    <Edit2 size={16} />
                </button>
            </td>
        </tr>
    );
};

export default RestaurantRow;
