import { Task } from '../models/Task';

export interface ITaskRepository {
    create(task: Omit<Task, 'id'>): Promise<Task>;
    findByUserId(userId: string): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
    update(id: string, updatedTask: Partial<Task>): Promise<Task | null>;
    delete(id: string): Promise<boolean>; 
}
