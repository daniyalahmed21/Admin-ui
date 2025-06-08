import { useState, useEffect } from 'react';
import { useTenants } from '../api/tenants.api';
import RestaurantForm from '../components/restaurant-form';
import Modal from '../components/modal';
import RestaurantTable from '../components/restaurant-table';
import type { Tenant } from '../types/tenant.types';
import { Search, Plus, Filter } from 'lucide-react';

const RestaurantsPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
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

    // Fetch tenants with filters
    const { data, isLoading, isError, error } = useTenants({
        q: debouncedSearch,
        currentPage,
        perPage,
    });

    const handleEditTenant = (tenant: Tenant) => {
        setSelectedTenant(tenant);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedTenant(null);
    };

    const totalPages = data ? Math.ceil(data.total / data.perPage) : 0;

    return (
        <div className="space-y-6">
            {/* Breadcrumbs */}
            <nav className="text-xs font-medium text-gray-400 flex gap-2">
                <span>Dashboard</span>
                <span>&gt;</span>
                <span className="text-gray-600">Restaurants</span>
            </nav>

            {/* Restaurant Form Modal (Create/Edit) */}
            <Modal isOpen={showForm} onClose={handleCloseForm}>
                <RestaurantForm
                    onClose={handleCloseForm}
                    tenantToEdit={selectedTenant}
                />
            </Modal>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search restaurants..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-orange-100 outline-none transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all shadow-sm">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button
                        onClick={() => {
                            setSelectedTenant(null);
                            setShowForm(true);
                        }}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#ff5a3d] hover:bg-[#e54e35] text-white px-5 py-2 rounded-xl text-sm font-bold transition-all "
                    >
                        <Plus size={18} />
                        Add Restaurant
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <RestaurantTable
                    tenants={data?.data || []}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    onEditTenant={handleEditTenant}
                />
            </div>
        </div>
    );
};

export default RestaurantsPage;
