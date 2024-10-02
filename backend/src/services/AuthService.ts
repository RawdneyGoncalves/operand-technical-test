import { injectable } from 'inversify';
import { auth as clientAuth } from '../config/firebase';
import { auth as adminAuth } from '../config/firebaseAdmin';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { IAuthService } from '../interfaces/IAuthService';
import { User } from '../models/User';

@injectable()
export class AuthService implements IAuthService {
  async register(userData: Omit<User, "id">): Promise<User> {
    const { email, password } = userData;
    try {
      const userCredential = await createUserWithEmailAndPassword(clientAuth, email, password);
      return { id: userCredential.user.uid, email: userCredential.user.email!, password, role: 'user' };
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user');
    }
  }

  async login(email: string, password: string): Promise<{ user: User; token: string } | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
      const token = await userCredential.user.getIdToken();
      return {
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email!,
          password: '',
          role: 'user',
        },
        token,
      };
    } catch (error) {
      console.error('Error logging in user:', error);
      throw new Error('Invalid email or password');
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(clientAuth, email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decodedToken = await adminAuth.verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new Error('Token verification failed');
    }
  }
}
