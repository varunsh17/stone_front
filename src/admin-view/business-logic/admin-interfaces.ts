export interface AddLeaseRequest {
    lease_no: string;
    bill_to: string;
    created_by?: number;
}

export interface UpdateLeaseRequest {
    lease_no: string;
    bill_to: string;
    updated_by?: number;
}

export interface LeaseDetails {
    code?: number;
    lease_no?: string;
    bill_to?: string;
}

export interface AllLease {
    code: number;
    leases: string[];
}

export interface AddBLDRequest {
    building_no: string;
    address: string;
    created_by?: number;
}

export interface UpdateBLDRequest {
    building_no: string;
    address: string;
    updated_by?: number;
}

export interface BLDDetails {
    code?: number;
    building_no?: string;
    address?: string;
}

export interface AllBLD {
    code: number;
    buildings: string[];
}

export interface AddActivityRequest {
    type: string
    management_fee: number;
    description: string;
}

export interface ActivityDetails {
    code?: number;
    type?: string
    managementFee?: number;
    description?: string;
}

export interface AllActivity {
    code: number;
    activities: string[];
}

export interface user {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export interface AllUsers {
    code: number;
    users: user[];
}

export interface APIResponse {
    code?: number;
    message?: string;
}
