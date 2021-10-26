import { Router } from 'express';
import UserController from '../api/users/users.controller';

const router = Router();
const controller = new UserController();

router.post('/', controller.join);

export default router;
