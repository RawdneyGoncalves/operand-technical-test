import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { Task } from "../models/Task";

export class TaskController {
  private taskService: TaskService;

  constructor() {
      this.taskService = new TaskService();
  }

  async create(req: Request, res: Response) {
      const userId = req.userId; 
      const taskData = req.body; 
      const newTask = await this.taskService.create(taskData, userId);
      res.status(201).json(newTask);
  }

  async getAll(req: Request, res: Response) {
      const userId = req.userId; 
      if (!userId) {
          return res.status(400).json({ message: "User ID is required." });
      }
      const tasks = await this.taskService.getTasksByUser(userId); 
      res.status(200).json(tasks);
  }

  async update(req: Request, res: Response) {
      const userId = req.userId; 
      const taskId = req.params.id; 
      const task = req.body; 
      await this.taskService.updateTask(userId, taskId, task);
      res.status(200).json({ message: "Task updated successfully." });
  }

  async delete(req: Request, res: Response) {
      const taskId = req.params.id; 
      await this.taskService.deleteTask(taskId);
      res.status(204).send(); 
  }
}