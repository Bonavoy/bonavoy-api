import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const newsletterSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model('newsletter', newsletterSchema);
