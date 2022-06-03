import mongoose from "mongoose";
const Schema = mongoose.Schema;

const newsletterSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Newsletter = mongoose.model("newsletter", newsletterSchema);

export default Newsletter;
