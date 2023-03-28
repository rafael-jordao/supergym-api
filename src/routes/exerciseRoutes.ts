import { Router } from 'express';
import authMiddleware from '../app/middlewares/authMiddleware';
import ExerciseController from '../app/controllers/ExerciseController';

const router = Router();

router.get('/:userId', authMiddleware, ExerciseController.index);
router.post('/', authMiddleware, ExerciseController.store);
router.delete('/:id', authMiddleware, ExerciseController.delete);

export default router;
