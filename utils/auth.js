import jwt from 'jsonwebtoken';

export const signAccessToken = (payload, secret) => {
  return jwt.sign(payload, secret, {
    expiresIn: '1h',
    algorithm: 'RS256',
  });
};

export const signRefreshToken = (payload, secret) => {
  return jwt.sign(payload, secret, {
    expiresIn: '60d',
    algorithm: 'RS256',
  });
};
