import { mongoose, Schema } from 'mongoose';

const User = mongoose.model(
  'User',
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true },
  }),
);

export default User;

export const UserRole = {
  ADMIN: 0,
  CUSTOMER: 1,
};
