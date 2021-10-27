import createError from '../../utils/createError';
import BoardService from './boards.service';

export default class BoardController {
  boardService = new BoardService();
  constructor() {
    this.getMany = this.getMany.bind(this);
    this.getOne = this.getOne.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getMany(req, res) {
    try {
      const { page } = req.query;
      if (!page) throw createError(400, 'query로 page를 작성해주세요.');
      const response = await this.boardService.getMany(parseInt(page) - 1);
      return res.json({ data: response });
    } catch (error) {
      return res.status(error.status || 500).send(error.message);
    }
  }
  async getOne(req, res) {
    try {
      const { board_id } = req.params;
      const response = await this.boardService.getOne(board_id);
      return res.json({ data: response });
    } catch (error) {
      res.status(error.status || 500).send(error.message);
    }
  }
  async create(req, res) {
    try {
      const user_id = req?.user?._id;
      const { title, content } = req.body;
      const newBoardId = await this.boardService.create({
        user_id,
        title,
        content,
      });
      return res.send(`new board's objectId: ${newBoardId}`);
    } catch (error) {
      return res.status(error.status || 500).send(error.message);
    }
  }
  async update(req, res) {
    try {
      const user_id = req?.user?._id;
      const { board_id } = req.params;
      await this.boardService.update({
        user_id,
        board_id,
        query: req.body,
      });
      return res.send('갱신을 완료했습니다.');
    } catch (error) {
      return res.status(error.status || 500).send(error.message);
    }
  }
  async delete(req, res) {
    try {
      const user_id = req?.user?._id;
      const { board_id } = req.params;
      if (!board_id) {
        throw createError(400, '파라미터로 글의 ObjectId를 작성해주세요.');
      }
      await this.boardService.delete({
        user_id,
        board_id,
      });
      return res.send('삭제를 완료했습니다.');
    } catch (error) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
