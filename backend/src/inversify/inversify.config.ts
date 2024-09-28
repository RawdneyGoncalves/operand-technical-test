import { Container } from "inversify";
import { AuthService } from "../services/AuthService";
import { IAuthService } from "../interfaces/IAuthService";
import { TaskService } from "../services/TaskService";
import { ITaskService } from "../interfaces/ITaskService";
import { UserRepository } from "../repositories/UserRepository";
import { IUserRepository } from "../interfaces/IUserRepository";
import { TaskRepository } from "../repositories/TaskRepository";
import { ITaskRepository } from "../interfaces/ITaskRepository";

const container = new Container();

container.bind<IAuthService>("AuthService").to(AuthService);
container.bind<IUserRepository>("UserRepository").to(UserRepository);
container.bind<ITaskService>("TaskService").to(TaskService);
container.bind<ITaskRepository>("TaskRepository").to(TaskRepository);

export { container };