import { Task } from "../models/Task";

export interface ITaskService {
  createTask(userId: string, taskData: Omit<Task, 'id'>): Promise<Task>;
  getTasksByUser(userId: string): Promise<Task[]>;
  updateTask(id: string, taskData: Partial<Task>): Promise<Task | null>;
  deleteTask(id: string): Promise<boolean>;
}