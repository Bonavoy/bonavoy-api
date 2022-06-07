import mongoose from 'mongoose';
import { MongoSession } from '../../../types/models';

import dotenv from 'dotenv';
dotenv.config();

const Schema = mongoose.Schema;
const SessionSchema = new Schema<MongoSession>({
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  token: { type: String, required: true },
  expireAt: { type: Date, default: Date.now },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//UPDATING TTL WILL ALSO REQUIRE DELETING MONGOOSE DB SESSION COLLECTION FOR NEW TTL TIME TO GET RECOGNZIED
SessionSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: Number(process.env.REFRESH_TOKEN_LIFETIME) / 1000 }
);

export default mongoose.model('session', SessionSchema);
