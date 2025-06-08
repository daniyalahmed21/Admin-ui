export interface Tenant {
    id: number;
    name: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

export interface TenantsResponse {
    currentPage: number;
    perPage: number;
    total: number;
    data: Tenant[];
}

export interface CreateTenantRequest {
    name: string;
    address: string;
}

export interface TenantFilters {
    q?: string;
    currentPage?: number;
    perPage?: number;
}
