import createError from '../../utils/createError';
import UserService from './users.service';

export default class UserController {
  userService = new UserService();
  constructor() {
    this.join = this.join.bind(this);
  }
  async join(req, res) {
    try {
      const { id, password } = req.body;
      if (id | password) {
        await this.userService.join({
          id,
          password,
        });
        return res.send('회원 가입을 완료했습니다.');
      } else throw createError(400, 'id와 password를 입력해주세요.');
    } catch (error) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
