import { Router } from 'express';
import AuthController from '../app/controllers/AuthController';

const router = Router();

router.post('/', AuthController.authenticate);

export default router;
