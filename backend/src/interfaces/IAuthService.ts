import { User } from "../models/User";

export interface IAuthService {
    register(userData: Omit<User, "id">): Promise<User>;
    login(email: string, password: string): Promise<{ user: User; token: string } | null>;
    resetPassword(email: string, newPassword: string): Promise<void>; 
    verifyToken(token: string): Promise<any>;
}
