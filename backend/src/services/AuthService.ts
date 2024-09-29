import { auth } from '../config/firebase'; // Isso deve estar correto
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; 
import { IAuthService } from '../interfaces/IAuthService';
import { User } from '../models/User';

export class AuthService implements IAuthService {
  async register(userData: Omit<User, "id">): Promise<User> {
    const { email, password } = userData;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { id: userCredential.user.uid, email: userCredential.user.email!, password, role: 'user' };
  }

  async login(email: string, password: string): Promise<string | null> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user.uid; 
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }

  async verifyToken(token: string): Promise<any> {
    // Implemente a lógica para verificar o token
  }
}
