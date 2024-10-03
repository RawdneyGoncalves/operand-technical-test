import { Task } from '../models/Task';

export interface ITaskRepository {
  createTask(userId: string, task: Task): Promise<Task>;
  getTasksByUser(userId: string): Promise<Task[]>;
  updateTask(userId: string, taskId: string, task: Partial<Task>): Promise<Task>;
  deleteTask(userId: string, taskId: string): Promise<void>;
}
