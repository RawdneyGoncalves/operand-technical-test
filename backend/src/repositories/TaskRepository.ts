import { db } from "../config/firebase";
import { ITaskRepository } from "../interfaces/ITaskRepository";
import { Task } from "../models/Task";

export class TaskRepository implements ITaskRepository {
  private collection = db.collection("tasks");

  async create(task: Omit<Task, 'id'>): Promise<Task> {
    const newTask: Task = { ...task, id: uuidv4(), createdAt: new Date() };t
    await this.collection.doc(newTask.id).set(newTask);
    return newTask; 
}

  async findByUserId(userId: string): Promise<Task[]> {
    const tasks: Task[] = [];
    const snapshot = await this.collection.where("userId", "==", userId).get();
    snapshot.forEach((doc) => tasks.push({ id: doc.id, ...doc.data() } as Task)); 
    return tasks;
  }

  async findById(id: string): Promise<Task | null> {
    const taskDoc = await this.collection.doc(id).get();
    if (taskDoc.exists) {
      return { id: taskDoc.id, ...taskDoc.data() } as Task; 
    }
    return null; 
  }

  async update(id: string, updatedTask: Partial<Task>): Promise<Task | null> {
    const taskRef = this.collection.doc(id);
    const taskDoc = await taskRef.get();
    if (taskDoc.exists) {
      await taskRef.update(updatedTask);
      return { id: taskDoc.id, ...taskDoc.data(), ...updatedTask } as Task; 
    }
    return null; 
  }

  async delete(id: string): Promise<boolean> {
    const taskRef = this.collection.doc(id);
    const taskDoc = await taskRef.get();
    if (taskDoc.exists) {
      await taskRef.delete();
      return true;
    }
    return false;
  }
}
