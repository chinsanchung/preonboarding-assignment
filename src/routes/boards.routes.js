import { Router } from 'express';
import BoardController from '../api/boards/boards.controller';
import { isLoggedIn } from '../middlewares/authority';

const router = Router();
const controller = new BoardController();

router.get('/', controller.getMany);
router.get('/:board_id', controller.getOne);
router.post('/', isLoggedIn, controller.create);
router.patch('/:board_id', isLoggedIn, controller.update);
router.delete('/:board_id', isLoggedIn, controller.delete);

export default router;
