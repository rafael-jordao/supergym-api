import { Router } from 'express';
import authRoutes from './authRoutes';
import categoryRoutes from './categoryRoutes';
import exerciseRoutes from './exerciseRoutes';
import trainingRoutes from './trainingRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/training', trainingRoutes);

export default router;
