export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: "admin" | "manager" | "customer";
    tenant: {
        id: number;
        name: string;
        address: string;
    } | null;
    createdAt: string;
    updatedAt: string;
}

export interface UsersResponse {
    currentPage: number;
    perPage: number;
    total: number;
    data: User[];
}

export interface CreateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "admin" | "manager" | "customer";
    tenantId?: number;
}

export interface UserFilters {
    q?: string;
    role?: string;
    currentPage?: number;
    perPage?: number;
}
