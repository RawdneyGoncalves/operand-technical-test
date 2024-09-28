"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TYPES = {
    IUserRepository: Symbol.for('IUserRepository'),
    ITaskRepository: Symbol.for('ITaskRepository'),
    IAuthService: Symbol.for('IAuthService'),
    ITaskService: Symbol.for('ITaskService'),
    AuthController: Symbol.for('AuthController'),
    TaskController: Symbol.for('TaskController')
};
exports.default = TYPES;
