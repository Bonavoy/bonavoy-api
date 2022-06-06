import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    userImage: { type: String },
    verified: { type: Boolean, default: false },
    trips: [{ type: Schema.Types.ObjectId, ref: 'trip' }],
    sessions: [{ type: String }],
  },
  { timestamps: true }
);

const User = mongoose.model('user', UserSchema);

export default User;
