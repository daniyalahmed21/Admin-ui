import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateTenant, useUpdateTenant } from '../api/tenants.api';
import { useState, useEffect } from 'react';
import type { Tenant } from '../types/tenant.types';

const restaurantSchema = z.object({
    name: z.string().min(1, 'Restaurant name is required'),
    address: z.string().min(1, 'Address is required'),
});

type RestaurantFormData = z.infer<typeof restaurantSchema>;

interface RestaurantFormProps {
    onClose: () => void;
    tenantToEdit?: Tenant | null;
}

const RestaurantForm = ({ onClose, tenantToEdit }: RestaurantFormProps) => {
    const isEditMode = !!tenantToEdit;
    const { mutate: createTenant, isPending: isCreating } = useCreateTenant();
    const { mutate: updateTenant, isPending: isUpdating } = useUpdateTenant();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<RestaurantFormData>({
        resolver: zodResolver(restaurantSchema),
        defaultValues: {
            name: tenantToEdit?.name || '',
            address: tenantToEdit?.address || '',
        }
    });

    useEffect(() => {
        if (tenantToEdit) {
            setValue('name', tenantToEdit.name);
            setValue('address', tenantToEdit.address);
        }
    }, [tenantToEdit, setValue]);

    const onSubmit = (data: RestaurantFormData) => {
        setSuccessMessage('');
        setErrorMessage('');

        if (isEditMode && tenantToEdit) {
            updateTenant({ id: tenantToEdit.id, data }, {
                onSuccess: () => {
                    setSuccessMessage('Restaurant updated successfully!');
                    setTimeout(() => {
                        onClose();
                    }, 1500);
                },
                onError: (error: any) => {
                    setErrorMessage(
                        error.response?.data?.message || 'Failed to update restaurant. Please try again.'
                    );
                },
            });
        } else {
            createTenant(data, {
                onSuccess: () => {
                    setSuccessMessage('Restaurant created successfully!');
                    reset();
                    setTimeout(() => {
                        onClose();
                    }, 1500);
                },
                onError: (error: any) => {
                    setErrorMessage(
                        error.response?.data?.message || 'Failed to create restaurant. Please try again.'
                    );
                },
            });
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                    {isEditMode ? 'Edit Restaurant' : 'Create New Restaurant'}
                </h2>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    type="button"
                >
                    <X size={20} className="text-gray-500" />
                </button>
            </div>

            {successMessage && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Restaurant Name
                    </label>
                    <input
                        {...register('name')}
                        type="text"
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                        placeholder="Pizza Hut"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                    </label>
                    <textarea
                        {...register('address')}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none"
                        rows={3}
                        placeholder="123 Pizza St, New York, NY"
                    />
                    {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                    )}
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={isCreating || isUpdating}
                        className="flex-1 bg-[#ff5a3d] hover:bg-[#e54e35] disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                        {isCreating || isUpdating ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Restaurant' : 'Create Restaurant')}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RestaurantForm;
