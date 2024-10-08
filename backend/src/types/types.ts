const TYPES = {
  IUserRepository: Symbol.for('IUserRepository'),
  ITaskRepository: Symbol.for('ITaskRepository'),
  IAuthService: Symbol.for('IAuthService'),
  ITaskService: Symbol.for('ITaskService'),
  AuthController: Symbol.for('AuthController'),
  TaskController: Symbol.for('TaskController'),
};

export default TYPES;
