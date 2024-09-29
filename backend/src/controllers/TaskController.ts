import { Request, Response } from 'express';
import { ITaskService } from '../interfaces/ITaskService';
import { Task } from '../models/Task';
import { inject, injectable } from 'inversify';
import TYPES from '../types/types';

@injectable()
export class TaskController {
  constructor(@inject(TYPES.ITaskService) private taskService: ITaskService) {}

  async createTask(req: Request, res: Response) {
    const { title, description, status } = req.body;
    const userId = req.userId ?? "defaultUserId";

    const newTask: Task = {
      id: '', // Gerar UUID se necessário
      title,
      description,
      status,
      createdAt: new Date(),
    };

    try {
      const createdTask = await this.taskService.createTask(userId, newTask);
      res.status(201).json(createdTask);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async getTasks(req: Request, res: Response) {
    const userId = req.userId ?? "defaultUserId";
    try {
      const tasks = await this.taskService.getTasksByUser(userId);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async updateTask(req: Request, res: Response) {
    const { taskId } = req.params;
    const task = req.body;
    const userId = req.userId ?? "defaultUserId";

    try {
      const updatedTask = await this.taskService.updateTask(userId, taskId, task);
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async deleteTask(req: Request, res: Response) {
    const { taskId } = req.params;
    const userId = req.userId ?? "defaultUserId";

    try {
      await this.taskService.deleteTask(userId, taskId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
}
