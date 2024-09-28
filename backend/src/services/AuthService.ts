import { injectable, inject } from 'inversify';
import { IAuthService } from '../interfaces/IAuthService';
import { IUserRepository } from '../interfaces/IUserRepository';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import TYPES from '../types/types';

@injectable()
export class AuthService implements IAuthService {
  private userRepository: IUserRepository;
  private secret: string = 'seu_segredo_jwt';

  constructor(
    @inject(TYPES.IUserRepository) userRepository: IUserRepository
  ) {
    this.userRepository = userRepository;
  }

  async register(userData: Omit<User, 'id'>): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword
    });
    return user;
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email }, this.secret, {
        expiresIn: '1h'
      });
      return token;
    }
    return null;
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      return null;
    }
  }

  async resetPassword(email: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10); 
    user.password = hashedPassword;
    await this.userRepository.update(user.id, user); 
  }
}
