import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DayPlanSchema = new Schema({
  date: { type: Date, required: true },
  spotsOfInterest: [{ type: Schema.Types.ObjectId, ref: 'spotOfInterest' }],
});

export default mongoose.model('dayPlan', DayPlanSchema);
