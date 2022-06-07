import mongoose from 'mongoose';
import { MongoUser } from '../../../types/models';
const Schema = mongoose.Schema;

const UserSchema = new Schema<MongoUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    userImage: { type: String },
    verified: { type: Boolean, default: false },
    trips: [{ type: Schema.Types.ObjectId, ref: 'trip' }],
  },
  { timestamps: true }
);

export default mongoose.model('user', UserSchema);
