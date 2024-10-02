import { Router } from 'express';
import { container } from '../inversify/inversify.config';
import TYPES from '../types/types';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = container.get<AuthController>(TYPES.AuthController);

router.post('/login', (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.register(req, res));
router.post('/reset-password', (req, res) => authController.resetPassword(req, res));

export default router;