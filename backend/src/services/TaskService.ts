import { injectable, inject } from 'inversify';
import { ITaskService } from '../interfaces/ITaskService';
import { ITaskRepository } from '../interfaces/ITaskRepository';
import { IUserRepository } from '../interfaces/IUserRepository';
import { Task } from '../models/Task';
import TYPES from '../types/types';



@injectable()
export class TaskService implements ITaskService {
    private taskRepository: ITaskRepository;
    private userRepository: IUserRepository;

    constructor(
        @inject(TYPES.ITaskRepository) taskRepository: ITaskRepository,
        @inject(TYPES.IUserRepository) userRepository: IUserRepository
    ) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    async createTask(userId: string, taskData: Omit<Task, 'id'>): Promise<Task> {
        return this.taskRepository.create(taskData);
    }

    async getTasksByUser(userId: string): Promise<Task[]> {
        return this.taskRepository.findByUserId(userId);
    }

    async updateTask(id: string, taskData: Partial<Task>): Promise<Task | null> {
        return this.taskRepository.update(id, taskData);
    }

    async deleteTask(id: string): Promise<boolean> {
        return this.taskRepository.delete(id);
    }
}