import { User } from "../models/User";

export interface IAuthService {
  register(userData: Omit<User, "id">): Promise<User>;
  login(email: string, password: string): Promise<string | null>;
  verifyToken(token: string): Promise<any>;
  resetPassword(email: string, newPassword: string): Promise<void>;
}
