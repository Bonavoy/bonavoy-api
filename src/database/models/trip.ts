import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TripSchema = new Schema(
  {
    name: { type: String, required: true },
    places: [{ type: Schema.Types.ObjectId, ref: 'place' }],
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    participants: [{ type: Schema.Types.ObjectId }], // Note: does not populate User document here due to circular dependency
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('trip', TripSchema);
