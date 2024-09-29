import { Request, Response, NextFunction } from 'express';
import { auth, firestore } from '../config/firebaseAdmin';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.userId = decodedToken.uid;

    const userDoc = await firestore.collection('users').doc(decodedToken.uid).get();
    const user = userDoc.data();

    if (user) {
      req.role = user.role;
    }

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
