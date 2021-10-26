import { Router } from 'express';
import userRouter from './users.routes';
import authRouter from './auth.routes';
import boardRouter from './boards.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/boards', boardRouter);

export default router;
