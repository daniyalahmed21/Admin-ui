import RestaurantRow from './restaurant-row';
import Pagination from './pagination';
import type { Tenant } from '../types/tenant.types';

interface RestaurantTableProps {
    tenants: Tenant[];
    isLoading: boolean;
    isError: boolean;
    error: any;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onEditTenant: (tenant: Tenant) => void;
}

const RestaurantTable = ({
    tenants,
    isLoading,
    isError,
    error,
    currentPage,
    totalPages,
    onPageChange,
    onEditTenant,
}: RestaurantTableProps) => {
    if (isLoading) {
        return (
            <div className="p-12 text-center">
                <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-[#ff5a3d] rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500 text-sm">Loading restaurants...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-12 text-center">
                <p className="text-red-500 text-sm">
                    Error loading restaurants: {error?.message || 'Unknown error'}
                </p>
            </div>
        );
    }

    if (tenants.length === 0) {
        return (
            <div className="p-12 text-center">
                <p className="text-gray-500 text-sm">No restaurants found</p>
            </div>
        );
    }

    return (
        <>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider font-bold">
                        <th className="px-6 py-4">Restaurant</th>
                        <th className="px-6 py-4">Address</th>
                        <th className="px-6 py-4">Joined Date</th>
                        <th className="px-6 py-4">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {tenants.map((tenant) => (
                        <RestaurantRow
                            key={tenant.id}
                            tenant={tenant}
                            onEdit={() => onEditTenant(tenant)}
                        />
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

export default RestaurantTable;
