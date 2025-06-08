import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "@/shared/api/axios";
import type { CreateUserRequest, UserFilters, UsersResponse } from "../types/user.types";

export const getUsers = async (filters: UserFilters): Promise<UsersResponse> => {
    const params = new URLSearchParams();

    if (filters.q) params.append("q", filters.q);
    if (filters.role) params.append("role", filters.role);
    if (filters.currentPage) params.append("currentPage", filters.currentPage.toString());
    if (filters.perPage) params.append("perPage", filters.perPage.toString());

    const res = await client.get(`/users?${params.toString()}`);
    return res.data;
};

export const createUser = async (data: CreateUserRequest): Promise<{ id: number }> => {
    const res = await client.post("/users", data);
    return res.data;
};

export const updateUser = async ({ id, data }: { id: number; data: Partial<CreateUserRequest> }): Promise<{ id: number }> => {
    const res = await client.patch(`/users/${id}`, data);
    return res.data;
};

// React Query Hooks
export const useUsers = (filters: UserFilters) => {
    return useQuery({
        queryKey: ["users", filters],
        queryFn: () => getUsers(filters),
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};
