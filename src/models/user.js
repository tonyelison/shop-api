import { mongoose, Schema } from 'mongoose';

const UserSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, required: true },
  active: { type: Boolean, required: true, default: false },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
});

UserSchema.virtual('full_name').get(function getFullName() {
  return `${this.first_name} ${this.last_name}`;
});

export default mongoose.model('User', UserSchema);

export const UserRole = {
  ADMIN: 0,
  CUSTOMER: 1,
};
