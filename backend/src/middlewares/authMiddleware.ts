import { Request, Response, NextFunction } from 'express';
import { auth, firestore } from '../config/firebaseAdmin';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.error('Authorization header missing');
        return res.status(401).json({ error: 'Unauthorized: Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.error('Token missing in Authorization header');
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
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
    } catch (error: any) {
        console.error('Error verifying token:', error);
        res.status(401).json({ error: 'Invalid token', details: error.message });
    }
};
