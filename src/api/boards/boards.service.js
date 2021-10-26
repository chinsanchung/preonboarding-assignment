import { ObjectId } from 'mongodb';
import BoardModel from '../../models/boards.model';
import createError from '../../utils/createError';

export default class BoardService {
  constructor() {
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
  async #checkEditability({ board_id, user_id }) {
    try {
      const board = await BoardModel.findOne({ _id: ObjectId(board_id) })
        .select('_id user_id')
        .lean();
      if (board) {
        if (!board.user_id.equals(user_id)) {
          throw createError(402, '작성자만 글을 제어할 수 있습니다.');
        }
        return true;
      } else {
        throw createError(404, '글이 존재하지 않습니다.');
      }
    } catch (error) {
      throw error;
    }
  }

  async getMany(page) {
    try {
      const LIMIT = 2;
      const response = await BoardModel.find({})
        .skip(page * LIMIT)
        .limit(LIMIT)
        .lean();

      console.log('getMany: ', response);

      return response;
    } catch (error) {
      console.log('error: ', error);
      throw createError(500, error?.message);
    }
  }

  async getOne(board_id) {
    try {
      const response = await BoardModel.findOne({
        _id: ObjectId(board_id),
      }).lean();
      console.log('getBoard: ', response);
      if (response) return response;
      else throw createError(404, '게시글이 없습니다.');
    } catch (error) {
      if (error?.status) {
        throw error;
      } else throw createError(500, error?.message);
    }
  }

  async create({ user_id, title, content }) {
    try {
      const response = await BoardModel.create({
        user_id,
        title,
        content,
        created_at: new Date(),
      });
      console.log('create: ', response);
      return response._id;
    } catch (error) {
      throw createError(500, error?.message);
    }
  }

  async update({ user_id, board_id, title, content }) {
    try {
      const isEditable = await this.#checkEditability({ board_id, user_id });
      if (isEditable) {
        await BoardModel.updateOne(
          { _id: ObjectId(board_id) },
          { $set: { title, content } }
        );
        return;
      }
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async delete({ user_id, board_id }) {
    try {
      const isEditable = await this.#checkEditability({ board_id, user_id });
      if (isEditable) {
        await BoardModel.deleteOne({ _id: ObjectId(board_id) });
        return;
      }
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }
}
