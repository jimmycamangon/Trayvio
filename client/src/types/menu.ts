export interface Menu {
    id: string;
    vendorId: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}