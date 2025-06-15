export interface FoodItem {
    id: string;
    vendorId: number;
    name: string;
    description: string;
    category: string;
    price: number;
    unitOfMeasure: string;
    serves: number;
    imageUrl?: string;
    isActive: boolean;
    createdAt?: string; // or Date, depending on your API
    updatedAt?: string; // or Date, depending on your API
}