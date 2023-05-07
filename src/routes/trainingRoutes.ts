import { Router } from 'express';
import authMiddleware from '../app/middlewares/authMiddleware';
import TrainingController from '../app/controllers/TrainingController';

const router = Router();

router.get('/user/:userId', authMiddleware, TrainingController.index);
router.get('/:id', authMiddleware, TrainingController.getTrainingById);
router.post('/', authMiddleware, TrainingController.store);

export default router;
