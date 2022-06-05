import fs from 'fs';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const secret = fs.readFileSync('secret.key', 'utf-8');
const refreshTokenSecret = fs.readFileSync('refreshTokenSecret.key', 'utf-8');

export const signAccessToken = (sub: string) => {
  return jwt.sign({ sub }, secret as string, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
    algorithm: process.env.ALGORITHM as string,
  });
};

export const signRefreshToken = (payload) => {
  return jwt.sign(payload, refreshTokenSecret, {
    expiresIn: process.env.REFRESH_TOKEN_LIFETIME,
    algorithm: process.env.ALGORITHM,
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(
    token,
    secret,
    (
      err: JsonWebTokenError,
      decoded: { sub: string; iat: number; exp: number }
    ) => {
      if (err) return err;
      return decoded;
    }
  );
};
