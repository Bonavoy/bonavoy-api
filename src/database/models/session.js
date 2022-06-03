import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SessionSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, ref: 'user' },
    token: { type: String, required: true },
  },
  { timestamps: true }
);

const Session = mongoose.model('session', SessionSchema);

export default Session;
