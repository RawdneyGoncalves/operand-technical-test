import { Request, Response } from 'express';
import { ITaskService } from '../interfaces/ITaskService';

class TaskController {
  constructor(private taskService: ITaskService) {}

  async createTask(req: Request, res: Response) {
    const { title, description, status } = req.body;
    const userId = req.userId;

    try {
      const newTask = await this.taskService.createTask(userId, { title, description, status });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async getTasks(req: Request, res: Response) {
    const userId = req.userId;
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
    const userId = req.userId;

    try {
      const updatedTask = await this.taskService.updateTask(userId, taskId, task);
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async deleteTask(req: Request, res: Response) {
    const { taskId } = req.params;
    const userId = req.userId;

    try {
      await this.taskService.deleteTask(userId, taskId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
}

export const taskController = new TaskController();
