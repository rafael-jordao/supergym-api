import { Router } from 'express';
import authMiddleware from '../app/middlewares/authMiddleware';

import DownloadPdfController from '../app/controllers/DownloadPdfController';

const router = Router();

router.get('/:id', DownloadPdfController.download);


export default router;
