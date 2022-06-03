import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SpotOfInterestSchema = new Schema({
  fsq_id: { type: String, required: true },
  from: { type: Date },
  to: { type: Date },
});

const SpotOfInterest = mongoose.model('spotOfInterest', SpotOfInterestSchema);

export default SpotOfInterest;
