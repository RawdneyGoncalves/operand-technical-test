import { Router } from 'express';
import { taskController } from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { taskAccessControl } from '../middlewares/roleMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.put('/:taskId', taskAccessControl, taskController.updateTask);
router.delete('/:taskId', taskAccessControl, taskController.deleteTask);

export default router;
