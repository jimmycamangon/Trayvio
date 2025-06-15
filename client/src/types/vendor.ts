import { User } from './users';

export interface Vendor {
    id: number;
    name: string;
    description: string;
    address: string;
    phonenumber: string;
    email: string;
    imageUrl?: string;
    isApproved: boolean;
    owner: User;
}

