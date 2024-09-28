import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { container } from "../inversify/inversify.config";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const taskController = container.get<TaskController>("TaskController");

router.post("/", authMiddleware, (req, res) => taskController.create(req, res));
router.get("/", authMiddleware, (req, res) => taskController.getAll(req, res));
router.put("/:id", authMiddleware, (req, res) => taskController.update(req, res));
router.delete("/:id", authMiddleware, (req, res) => taskController.delete(req, res));

export default router;
