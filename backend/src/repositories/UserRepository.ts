import { injectable } from 'inversify';
import { IUserRepository } from '../interfaces/IUserRepository';
import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class UserRepository implements IUserRepository {
  private users: User[] = [];
  private loginAttempts: Record<string, { attempts: number; lastAttempt: number }> = {}; 

  async create(user: Omit<User, 'id'> & { password: string }): Promise<User> {
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

  public async registerLoginAttempt(email: string): Promise<string | null> {
    const now = Date.now();
    const attemptData = this.loginAttempts[email] || { attempts: 0, lastAttempt: 0 };

    if (now - attemptData.lastAttempt < 60000) {
      if (attemptData.attempts >= 5) {
        return 'Blocked';
      }
      attemptData.attempts += 1;
    } else {
      attemptData.attempts = 1; 
    }
    
    attemptData.lastAttempt = now;
    this.loginAttempts[email] = attemptData;
    return null; 
  }
}
