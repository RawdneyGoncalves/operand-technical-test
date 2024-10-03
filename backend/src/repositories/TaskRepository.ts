import { injectable } from 'inversify';
import { ITaskRepository } from '../interfaces/ITaskRepository';
import { Task } from '../models/Task';
import { v4 as uuidv4 } from 'uuid';
import { firestore } from '../config/firebaseAdmin';

@injectable()
export class TaskRepository implements ITaskRepository {
  async createTask(userId: string, task: Task): Promise<Task> {
    const newTask = { ...task, id: uuidv4(), createdAt: new Date() };
    await firestore.collection('tasks').doc(newTask.id).set({ ...newTask, userId });
    return newTask;
  }

  async getTasksByUser(userId: string): Promise<Task[]> {
    const snapshot = await firestore.collection('tasks').where('userId', '==', userId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
  }

  async updateTask(userId: string, taskId: string, task: Partial<Task>): Promise<Task> {
    await firestore.collection('tasks').doc(taskId).update(task);
    const updatedDoc = await firestore.collection('tasks').doc(taskId).get();
    return { id: taskId, ...updatedDoc.data() } as Task;
  }

  async deleteTask(userId: string, taskId: string): Promise<void> {
    await firestore.collection('tasks').doc(taskId).delete();
  }
}
