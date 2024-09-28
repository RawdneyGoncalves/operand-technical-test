"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            if (!userId) {
                return res.status(401).json({ error: "User not authenticated." });
            }
            const task = req.body;
            yield this.taskService.createTask(userId, task);
            res.status(201).json({ message: "Task created successfully." });
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const tasks = yield this.taskService.getTasksByUser(userId);
            res.status(200).json(tasks);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const taskId = req.params.id;
            const task = req.body;
            yield this.taskService.updateTask(userId, taskId, task);
            res.status(200).json({ message: "Task updated successfully." });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const taskId = req.params.id;
            yield this.taskService.deleteTask(userId, taskId);
            res.status(200).json({ message: "Task deleted successfully." });
        });
    }
}
exports.TaskController = TaskController;
