import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface MongoDayPlan {
  date: Date;
  spotsOfInterest: mongoose.Types.ObjectId[];
}

const DayPlanSchema = new Schema({
  date: { type: Date, required: true },
  spotsOfInterest: [{ type: Schema.Types.ObjectId, ref: 'spotOfInterest' }],
});

export default mongoose.model('dayPlan', DayPlanSchema);
