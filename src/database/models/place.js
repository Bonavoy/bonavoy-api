import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const PlaceSchema = Schema({
  name: { type: String, required: true },
  mapbox_id: { type: String, required: true },
  from: { type: Date },
  to: { type: Date },
  duration: { type: Number, required: true },
  // dayPlan: [{ type: Schema.Types.ObjectId, ref: 'dayPlan' }],
});

const Place = mongoose.model('place', PlaceSchema);

export default Place;
