import { Request, Response, NextFunction } from 'express';
import { firestore } from '../config/firebaseAdmin';

export const taskAccessControl = async (req: Request, res: Response, next: NextFunction) => {
  const { taskId } = req.params;
  const userId = req.userId;

  try {
    const taskDoc = await firestore.collection('tasks').doc(taskId).get();
    const task = taskDoc.data();

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.userId === userId || req.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
