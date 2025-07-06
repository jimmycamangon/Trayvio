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

export interface CurrentUserResponse {
    success: boolean;
    message: string;
    user: Omit<User, 'passwordHash'> | null;
}