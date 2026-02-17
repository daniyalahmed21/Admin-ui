import { useQuery } from "@tanstack/react-query";
import client from "@/shared/api/axios";
import type { TenantsResponse } from "../types/tenant.types";

export const getTenants = async (): Promise<TenantsResponse> => {
    const res = await client.get("/tenant?perPage=100");
    return res.data;
};

export const useTenants = () => {
    return useQuery({
        queryKey: ["tenants"],
        queryFn: getTenants,
    });
};
