import { auth as clientAuth } from '../config/firebase'; 
import { auth as adminAuth } from '../config/firebaseAdmin'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; 
import { IAuthService } from '../interfaces/IAuthService';
import { User } from '../models/User';

export class AuthService implements IAuthService {
  async register(userData: Omit<User, "id">): Promise<User> {
    const { email, password } = userData;
    const userCredential = await createUserWithEmailAndPassword(clientAuth, email, password);
    return { id: userCredential.user.uid, email: userCredential.user.email!, password, role: 'user' };
  }

  async login(email: string, password: string): Promise<string | null> {
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    return userCredential.user.uid; 
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(clientAuth, email);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decodedToken = await adminAuth.verifyIdToken(token);
      return decodedToken; 
    } catch (error) {
      throw new Error('Token verification failed');
    }
  }
}
