import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DayPlanSchema = new Schema({
  date: { type: Date, required: true },
  spotsOfInterest: [{ type: Schema.Types.ObjectId, ref: 'spotOfInterest' }],
});

const DayPlan = mongoose.model('dayPlan', DayPlanSchema);

export default DayPlan;
