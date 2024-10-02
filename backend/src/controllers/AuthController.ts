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
        } catch (error: any) {
            console.error('Error registering user:', error);
            if (error.code === 'auth/email-already-in-use') {
                return res.status(400).json({ error: 'Email already in use' });
            }
            return res.status(500).json({ error: 'Failed to register user' });
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        try {
            const result = await this.authService.login(email, password);
            
            // Verifique se o resultado é nulo
            if (!result) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const { user, token } = result; // Aqui você pode garantir que 'result' não é nulo

            return res.status(200).json({ user, token }); 
        } catch (error: any) {
            console.error('Error logging in user:', error);
            if (error.code === 'auth/wrong-password') {
                return res.status(401).json({ error: 'Invalid password' });
            }
            if (error.code === 'auth/user-not-found') {
                return res.status(404).json({ error: 'User not found' });
            }
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
