import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { container } from '../inversify.config';

const router = Router();
const authController = container.get(AuthController);

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
