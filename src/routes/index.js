import { Router } from 'express';
import userRouter from './users.routes';
import authRouter from './auth.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
