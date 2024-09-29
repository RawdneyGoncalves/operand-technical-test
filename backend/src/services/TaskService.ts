import { ITaskService } from '../interfaces/ITaskService';
import { ITaskRepository } from '../interfaces/ITaskRepository';
import { Task } from '../models/Task';
import { inject, injectable } from 'inversify';
import { TYPES } from '../inversify/types';

@injectable()
export class TaskService implements ITaskService {
  constructor(
    @inject(TYPES.ITaskRepository) private taskRepository: ITaskRepository
  ) {}

  async createTask(userId: string, task: Task): Promise<Task> {
    return await this.taskRepository.createTask(userId, task);
  }

  async getTasksByUser(userId: string): Promise<Task[]> {
    return await this.taskRepository.getTasksByUser(userId);
  }

  async updateTask(userId: string, taskId: string, task: Task): Promise<Task> {
    return await this.taskRepository.updateTask(userId, taskId, task);
  }

  async deleteTask(userId: string, taskId: string): Promise<void> {
    return await this.taskRepository.deleteTask(userId, taskId);
  }
}
