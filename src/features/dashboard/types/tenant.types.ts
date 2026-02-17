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
