import fs from 'fs';
import jwt, { JsonWebTokenError, Algorithm } from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

import { TokenPayload } from '../../types/auth';

const secret = fs.readFileSync('secret.key', 'utf-8');
const refreshTokenSecret = fs.readFileSync('refreshTokenSecret.key', 'utf-8');

export const signAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, secret as string, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
    algorithm: process.env.ALGORITHM as Algorithm,
  });
};

export const signRefreshToken = (sub: string) => {
  return jwt.sign({ sub }, refreshTokenSecret as string, {
    expiresIn: process.env.REFRESH_TOKEN_LIFETIME,
    algorithm: process.env.ALGORITHM as Algorithm,
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
