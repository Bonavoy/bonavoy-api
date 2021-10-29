import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signAccessToken = (payload, secret) => {
  return jwt.sign(payload, secret, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
    algorithm: process.env.ALGORITHM,
  });
};

export const signRefreshToken = (payload, secret) => {
  return jwt.sign(payload, secret, {
    expiresIn: process.env.REFRESH_TOKEN_LIFETIME,
    algorithm: process.env.ALGORITHM,
  });
};
