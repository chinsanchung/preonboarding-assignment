import { Router } from 'express';
import BoardController from '../api/boards/boards.controller';

const router = Router();
const controller = new BoardController();

router.get('/', controller.getMany);
router.get('/:board_id', controller.getOne);
router.post('/', controller.create);
router.patch('/', controller.update);
router.delete('/:board_id', controller.delete);

export default router;
