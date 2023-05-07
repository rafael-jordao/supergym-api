import { Router } from 'express';
import authRoutes from './authRoutes';
import categoryRoutes from './categoryRoutes';
import exerciseRoutes from './exerciseRoutes';
import trainingRoutes from './trainingRoutes';
import userRoutes from './userRoutes';
import pdfRoutes from './pdfRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/training', trainingRoutes);
router.use('/download', pdfRoutes);

export default router;
