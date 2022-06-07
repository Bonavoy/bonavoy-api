import { Types } from 'mongoose';

export interface MongoUser {
  _id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  userImage: string;
  verified: boolean;
  trips: Types.ObjectId[];
}
export interface MongoSession {
  _id: string;
  user: Types.ObjectId;
  token: string;
  expireAt: Date;
  createdAt: Date;
}
