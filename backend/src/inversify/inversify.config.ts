import { Container } from 'inversify';
import { ITaskRepository } from '../interfaces/ITaskRepository';
import { TaskRepository } from '../repositories/TaskRepository';
import { ITaskService } from '../interfaces/ITaskService';
import { TaskService } from '../services/TaskService';
import { TYPES } from './types';

const container = new Container();

container.bind<ITaskRepository>(TYPES.ITaskRepository).to(TaskRepository);
container.bind<ITaskService>(TYPES.ITaskService).to(TaskService);

export { container };
