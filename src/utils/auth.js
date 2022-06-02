import fs from 'fs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const secret = fs.readFileSync('secret.key', 'utf-8');
const refreshTokenSecret = fs.readFileSync('refreshTokenSecret.key', 'utf-8');

export const signAccessToken = (payload) => {
  return jwt.sign(payload, secret, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
    algorithm: process.env.ALGORITHM,
  });
};

export const signRefreshToken = (payload) => {
  return jwt.sign(payload, refreshTokenSecret, {
    expiresIn: process.env.REFRESH_TOKEN_LIFETIME,
    algorithm: process.env.ALGORITHM,
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(
    token,
    secret,
    { algorithms: process.env.ALGORITHM },
    (err, decoded) => {
      if (err) return res;
      return decoded;
    }
  );
};
