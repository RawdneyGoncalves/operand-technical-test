import { injectable } from 'inversify';
import { IUserRepository } from '../interfaces/IUserRepository';
import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class UserRepository implements IUserRepository {
  private users: User[] = [];

  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser: User = { id: uuidv4(), ...user, isAdmin: false }; 
    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);
    return user || null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);
    return user || null;
  }

  async update(userId: string, userData: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex === -1) return null;

    this.users[userIndex] = { ...this.users[userIndex], ...userData };
    return this.users[userIndex];
}
}
