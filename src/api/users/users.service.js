import UserModel from '../../models/users.model';
import bcrypt from 'bcrypt';
import createError from '../../utils/createError';

export default class UserService {
  constructor() {
    this.join = this.join.bind(this);
  }
  #bcryptPassword(password) {
    const SALT = 5;
    return bcrypt.hashSync(password, SALT);
  }
  async join({ id, password }) {
    try {
      const newPassword = this.#bcryptPassword(password);
      await UserModel.create({
        id,
        password: newPassword,
      });
      // console.log('response: ', response);
      return;
    } catch (error) {
      console.log(error);
      throw createError(500, error?.messgae);
    }
  }
}
