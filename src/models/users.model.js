import { Schema, model } from 'mongoose';

const schema = new Schema({
  id: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = model('users', schema);

export default UserModel;
