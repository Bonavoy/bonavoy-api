import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    token: { type: String, required: true },
    expireAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

SessionSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('session', SessionSchema);
