import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const Schema = mongoose.Schema;

const SessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    token: { type: String, required: true },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: Number(process.env.REFRESH_TOKEN_LIFETIME) },
    },
  },
  { timestamps: true }
);

SessionSchema.index(
  { expireAt: 1 },
  { expires: Number(process.env.REFRESH_TOKEN_LIFETIME) }
);
const Session = mongoose.model('session', SessionSchema);

export default Session;
