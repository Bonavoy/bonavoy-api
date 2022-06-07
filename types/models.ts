import { Types } from 'mongoose';

export interface User {
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
