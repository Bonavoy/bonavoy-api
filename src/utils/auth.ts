import fs from 'fs';
import jwt, { JsonWebTokenError, Algorithm } from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

import { TokenPayload } from '../../types/auth';

const secret = fs.readFileSync('secret.key', 'utf-8');
const refreshTokenSecret = fs.readFileSync('refreshTokenSecret.key', 'utf-8');

//access token will store more specific data
export const signAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, secret, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
    algorithm: process.env.ALGORITHM as Algorithm,
  });
};

//refresh token will only store user id
export const signRefreshToken = (sub: string) => {
  return jwt.sign({ sub }, refreshTokenSecret, {
    expiresIn: process.env.REFRESH_TOKEN_LIFETIME,
    algorithm: process.env.ALGORITHM as Algorithm,
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(
    token,
    secret,
    { algorithms: process.env.ALGORITHM as unknown as Algorithm[] },
    (
      err: JsonWebTokenError,
      decoded: { sub: string; iat: number; exp: number }
    ) => {
      if (err) return err;
      return decoded;
    }
  );
};

export const verifyRefreshToken = (refresh: string) => {
  return jwt.verify(
    refresh,
    secret,
    { algorithms: process.env.ALGORITHM as unknown as Algorithm[] },
    (
      err: JsonWebTokenError,
      decoded: { sub: string; iat: number; exp: number }
    ) => {
      if (err) return err;
      return decoded;
    }
  );
};
