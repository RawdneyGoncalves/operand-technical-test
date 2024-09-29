import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from '../types/types';
import { IUserRepository } from '../interfaces/IUserRepository';
import { ITaskRepository } from '../interfaces/ITaskRepository';
import { TaskRepository } from '../repositories/TaskRepository';
import { IAuthService } from '../interfaces/IAuthService';
import { AuthService } from '../services/AuthService';
import { ITaskService } from '../interfaces/ITaskService';
import { TaskService } from '../services/TaskService';
import { authController } from '../controllers/AuthController';
import { taskController } from '../controllers/TaskController';


const container = new Container();

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
container.bind<ITaskRepository>(TYPES.ITaskRepository).to(TaskRepository).inSingletonScope();


container.bind<IAuthService>(TYPES.IAuthService).to(AuthService).inSingletonScope();
container.bind<ITaskService>(TYPES.ITaskService).to(TaskService).inSingletonScope();


container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<TaskController>(TYPES.TaskController).to(TaskController);

export { container };
