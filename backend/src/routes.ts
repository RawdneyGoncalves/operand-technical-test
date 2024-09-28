import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { TaskController } from "./controllers/TaskController";

const router = Router();
const taskController = new TaskController(new TaskService(new TaskRepository()));

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.post("/auth/reset-password", AuthController.resetPassword);

router.post("/tasks", taskController.create);
router.get("/tasks", taskController.getAll);
router.put("/tasks/:id", taskController.update);
router.delete("/tasks/:id", taskController.delete);

export default router;