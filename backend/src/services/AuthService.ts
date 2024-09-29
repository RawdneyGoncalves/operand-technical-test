import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { IAuthService } from '../interfaces/IAuthService';
import { User } from '../models/User';

export class AuthService implements IAuthService {
  async register(userData: Omit<User, "id">): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  async resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }
}
