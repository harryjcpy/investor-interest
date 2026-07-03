import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { notificationController } from '../controllers/notification.controller';

const router = Router();

router.get(
    "/",
    authenticate,
    notificationController
);

export default router;