import { Router } from 'express';
import authMiddleware from '../app/middlewares/authMiddleware';
import CategoryController from '../app/controllers/CategoryController';

const router = Router();

router.post('/', authMiddleware, CategoryController.store);
router.get('/', authMiddleware, CategoryController.index);
router.get('/:categoryId/exercises', authMiddleware, CategoryController.findExercisesByCategory);
router.delete('/:id', authMiddleware, CategoryController.delete);

export default router;
