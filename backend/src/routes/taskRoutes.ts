import { Router } from 'express';
import { container } from '../inversify/inversify.config';
import TYPES from '../types/types';
import { TaskController } from '../controllers/TaskController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { taskAccessControl } from '../middlewares/roleMiddleware';

const router = Router();
const taskController = container.get<TaskController>(TYPES.TaskController);

router.use(authMiddleware);

router.post('/', (req, res) => taskController.createTask(req, res));
router.get('/', (req, res) => taskController.getTasks(req, res));
router.put('/:taskId', taskAccessControl, (req, res) => taskController.updateTask(req, res));
router.delete('/:taskId', taskAccessControl, (req, res) => taskController.deleteTask(req, res));

export default router;
