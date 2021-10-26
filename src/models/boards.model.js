import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  user_id: { type: Types.ObjectId, ref: 'users', required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' },
  created_at: { type: Date, required: true },
});

const BoardModel = model('boards', schema);

export default BoardModel;
