import { Request, Response } from 'express';
import { IAuthService } from '../interfaces/IAuthService';
import { inject, injectable } from 'inversify';
import TYPES from '../types/types';

@injectable()
export class AuthController {
  constructor(@inject(TYPES.IAuthService) private authService: IAuthService) {}

  async register(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const user = await this.authService.register({ email, password, role: 'user' });
      return res.status(201).json({ user });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Failed to register user' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const user = await this.authService.login(email, password);
      return res.status(200).json({ user });
    } catch (error) {
      console.error('Error logging in user:', error);
      return res.status(500).json({ error: 'Failed to log in user' });
    }
  }

  async resetPassword(req: Request, res: Response) {
    const { email, newPassword } = req.body; 

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      await this.authService.resetPassword(email, newPassword);
      return res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return res.status(500).json({ error: 'Failed to send password reset email' });
    }
  }
}
