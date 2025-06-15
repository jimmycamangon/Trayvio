export interface User {
    id: string;
    fullName: string;
    email: string;
    passwordHash: string;
    phoneNumber: string;
    role: string;
    createdAt: Date;
    isActive: boolean;
}

