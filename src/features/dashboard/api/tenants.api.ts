import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "@/shared/api/axios";
import type { CreateTenantRequest, TenantFilters, TenantsResponse } from "../types/tenant.types";

export const getTenants = async (filters: TenantFilters = {}): Promise<TenantsResponse> => {
    const params = new URLSearchParams();

    if (filters.q) params.append("q", filters.q);
    if (filters.currentPage) params.append("currentPage", filters.currentPage.toString());
    if (filters.perPage) params.append("perPage", filters.perPage.toString());

    const res = await client.get(`/tenant?${params.toString()}`);
    return res.data;
};

export const createTenant = async (data: CreateTenantRequest): Promise<{ id: number }> => {
    const res = await client.post("/tenant", data);
    return res.data;
};

export const updateTenant = async ({ id, data }: { id: number; data: Partial<CreateTenantRequest> }): Promise<{ id: number }> => {
    const res = await client.patch(`/tenant/${id}`, data);
    return res.data;
};

// React Query Hooks
export const useTenants = (filters?: TenantFilters) => {
    return useQuery({
        queryKey: ["tenants", filters],
        queryFn: () => getTenants(filters),
    });
};

export const useCreateTenant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTenant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tenants"] });
        },
    });
};

export const useUpdateTenant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTenant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tenants"] });
        },
    });
};
