import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const PlaceSchema = new Schema({
  name: { type: String, required: true },
  mapbox_id: { type: String, required: true },
  from: { type: Date },
  to: { type: Date },
  duration: { type: Number, required: true },
  dayPlan: { type: Schema.Types.ObjectId, ref: 'dayPlan' },
});

export default mongoose.model('place', PlaceSchema);
