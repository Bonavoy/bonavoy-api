import fs from 'fs';
import jwt, { JsonWebTokenError, Algorithm } from 'jsonwebtoken';

//types
import { TokenPayload, TokenDecoded, RefreshDecoded } from '../../types/auth';
import { User } from '../../types/models';

import dotenv from 'dotenv';
dotenv.config();

const secret = fs.readFileSync('secret.key', 'utf-8');
const refreshTokenSecret = fs.readFileSync('refreshTokenSecret.key', 'utf-8');

//what we want to store on access token from the user doc
export const tokenPayloadBuilder = (user: User): TokenPayload => {
  return {
    username: user.username,
    sub: user._id,
  };
};

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

export const verifyAccessToken = (
  tokenStr: string
): {
  token: TokenDecoded;
  tokenError: JsonWebTokenError;
} => {
  return jwt.verify(
    tokenStr,
    secret,
    { algorithms: process.env.ALGORITHM as unknown as Algorithm[] },
    (tokenError: JsonWebTokenError, token: TokenPayload) => {
      return { tokenError, token };
    }
  ) as unknown as {
    token: TokenDecoded;
    tokenError: JsonWebTokenError;
  };
};

export const verifyRefreshToken = (
  refreshStr: string
): {
  refresh: RefreshDecoded;
  refreshError: JsonWebTokenError;
} => {
  return jwt.verify(
    refreshStr,
    refreshTokenSecret,
    { algorithms: process.env.ALGORITHM as unknown as Algorithm[] },
    (refreshError: JsonWebTokenError, refresh: RefreshDecoded) => {
      return { refreshError, refresh };
    }
  ) as unknown as {
    refresh: RefreshDecoded;
    refreshError: JsonWebTokenError;
  };
};
