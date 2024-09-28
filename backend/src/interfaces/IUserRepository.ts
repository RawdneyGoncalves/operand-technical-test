import { User } from "../models/User";

export interface IUserRepository {
    create(user: Omit<User, 'id'>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    update(userId: string, userData: Partial<User>): Promise<User | null>; 
  }