import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateUser, useUpdateUser } from '../api/users.api';
import { useTenants } from '../api/tenants.api';
import { useState, useEffect } from 'react';
import type { User } from '../types/user.types';

const userSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters').optional().or(z.literal('')),
    role: z.enum(['admin', 'manager', 'customer']),
    tenantId: z.number().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
    onClose: () => void;
    userToEdit?: User | null;
}

const UserForm = ({ onClose, userToEdit }: UserFormProps) => {
    const isEditMode = !!userToEdit;
    const { mutate: createUser, isPending: isCreating } = useCreateUser();
    const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
    const { data: tenants } = useTenants();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            firstName: userToEdit?.firstName || '',
            lastName: userToEdit?.lastName || '',
            email: userToEdit?.email || '',
            role: userToEdit?.role || 'customer',
            tenantId: userToEdit?.tenant?.id || undefined,
            password: '',
        }
    });

    useEffect(() => {
        if (userToEdit) {
            setValue('firstName', userToEdit.firstName);
            setValue('lastName', userToEdit.lastName);
            setValue('email', userToEdit.email);
            setValue('role', userToEdit.role);
            setValue('tenantId', userToEdit.tenant?.id || undefined);
        }
    }, [userToEdit, setValue]);

    const onSubmit = (data: UserFormData) => {
        setSuccessMessage('');
        setErrorMessage('');

        if (isEditMode && userToEdit) {
            const updateData: any = { ...data };
            if (!updateData.password) delete updateData.password;

            updateUser({ id: userToEdit.id, data: updateData }, {
                onSuccess: () => {
                    setSuccessMessage('User updated successfully!');
                    setTimeout(() => {
                        onClose();
                    }, 1500);
                },
                onError: (error: any) => {
                    setErrorMessage(
                        error.response?.data?.message || 'Failed to update user. Please try again.'
                    );
                },
            });
        } else {
            createUser(data as any, {
                onSuccess: () => {
                    setSuccessMessage('User created successfully!');
                    reset();
                    setTimeout(() => {
                        onClose();
                    }, 1500);
                },
                onError: (error: any) => {
                    setErrorMessage(
                        error.response?.data?.message || 'Failed to create user. Please try again.'
                    );
                },
            });
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                    {isEditMode ? 'Edit User' : 'Create New User'}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            {...register('firstName')}
                            type="text"
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                            placeholder="John"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            {...register('lastName')}
                            type="text"
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                            placeholder="Doe"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                        placeholder="john.doe@example.com"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password {isEditMode && '(Leave empty to keep current)'}
                    </label>
                    <input
                        {...register('password')}
                        type="password"
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                        placeholder="••••••••"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                    </label>
                    <select
                        {...register('role')}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-100 outline-none cursor-pointer"
                    >
                        <option value="">Select a role</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="customer">Customer</option>
                    </select>
                    {errors.role && (
                        <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tenant (Optional)
                    </label>
                    <select
                        {...register('tenantId', {
                            setValueAs: (value) => (value === '' ? undefined : Number(value)),
                        })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-100 outline-none cursor-pointer"
                    >
                        <option value="">No Tenant</option>
                        {tenants?.data.map((tenant) => (
                            <option key={tenant.id} value={tenant.id}>
                                {tenant.name}
                            </option>
                        ))}
                    </select>
                    {errors.tenantId && (
                        <p className="text-red-500 text-xs mt-1">{errors.tenantId.message}</p>
                    )}
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={isCreating || isUpdating}
                        className="flex-1 bg-[#ff5a3d] hover:bg-[#e54e35] disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                        {isCreating || isUpdating ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update User' : 'Create User')}
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

export default UserForm;
