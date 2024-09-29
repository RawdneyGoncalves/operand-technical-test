import { Request, Response } from 'express';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase'; 

export class AuthController {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return res.status(201).json({ user: userCredential.user });
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return res.status(200).json({ user: userCredential.user });
    } catch (error) {
      console.error('Error logging in user:', error);
      return res.status(500).json({ error: 'Failed to log in user' });
    }
  }

  async resetPassword(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      await sendPasswordResetEmail(auth, email);
      return res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return res.status(500).json({ error: 'Failed to send password reset email' });
    }
  }
}

export const authController = new AuthController();
