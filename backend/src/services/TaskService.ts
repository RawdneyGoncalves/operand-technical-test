import { ITaskService } from '../interfaces/ITaskService';
import { ITaskRepository } from '../interfaces/ITaskRepository';
import { Task } from '../models/Task';
import { injectable, inject } from 'inversify';
import TYPES from '../types/types';

@injectable()
export class TaskService implements ITaskService {
  constructor(
    @inject(TYPES.ITaskRepository) private taskRepository: ITaskRepository
  ) {}

  createTask(userId: string, task: Task): Promise<Task> {
    return this.taskRepository.createTask(userId, task);
  }

  getTasksByUser(userId: string): Promise<Task[]> {
    return this.taskRepository.getTasksByUser(userId);
  }

  updateTask(userId: string, taskId: string, task: Partial<Task>): Promise<Task> {
    return this.taskRepository.updateTask(userId, taskId, task);
  }
  
  deleteTask(userId: string, taskId: string): Promise<void> {
    return this.taskRepository.deleteTask(userId, taskId);
  }
}
