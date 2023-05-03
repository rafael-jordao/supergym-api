import { Router } from 'express';
import authMiddleware from '../app/middlewares/authMiddleware';
import UserController from '../app/controllers/UserController';
import errorHandler from '../app/middlewares/errorHandler';

const router = Router();

router.get('/', authMiddleware, UserController.index);
router.post('/', errorHandler, UserController.store);
router.put('/', errorHandler, UserController.updatePassword);

export default router;
