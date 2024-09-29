import { ITaskRepository } from '../interfaces/ITaskRepository';
import { Task } from '../models/Task';
import { firestore } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

export class TaskRepository implements ITaskRepository {
  async createTask(userId: string, task: Task): Promise<Task> {
    const newTask = { ...task, id: uuidv4(), createdAt: new Date() };
    await firestore.collection('tasks').doc(newTask.id).set({ ...newTask, userId });
    return newTask;
  }

  async getTasksByUser(userId: string): Promise<Task[]> {
    const snapshot = await firestore.collection('tasks').where('userId', '==', userId).get();
    return snapshot.docs.map(doc => doc.data() as Task);
  }

  async updateTask(userId: string, taskId: string, task: Task): Promise<Task> {
    await firestore.collection('tasks').doc(taskId).update(task);
    const updatedTask = await firestore.collection('tasks').doc(taskId).get();
    return updatedTask.data() as Task;
  }

  async deleteTask(userId: string, taskId: string): Promise<void> {
    await firestore.collection('tasks').doc(taskId).delete();
  }
}
