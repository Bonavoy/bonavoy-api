import fs from 'fs';
import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { signAccessToken, signRefreshToken } from '../utils/auth';
import * as crud from '../database/crud/user';

dotenv.config();
const secret = fs.readFileSync('secret.key', 'utf-8');
const refreshTokenSecret = fs.readFileSync('refreshTokenSecret.key', 'utf-8');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const user = req.body;
    if (user.password !== user.confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
    const existingEmails = await crud.getUser({ email: user.email });
    const existingUsernames = await crud.getUser({
      username: user.username,
    });

    if (existingEmails.length >= 1) {
      return res.status(400).json({ error: 'Email exists' });
    }
    if (existingUsernames.length >= 1) {
      return res.status(400).json({ error: 'Username exists' });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        if (err) return next(err);
        // Store hash in DB
        const userDetails = {
          email: user.email,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          password: hash,
        };
        try {
          const newUser = await crud.createUser(userDetails);
          // return user details without password
          const newUserDetails = {
            email: newUser.email,
            username: newUser.username,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            userImage: null,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
          };
          const token = signAccessToken(user, secret);
          const refreshToken = signRefreshToken(user, refreshTokenSecret);
          return res.status(200).json({
            token,
            refreshToken,
            ...newUserDetails,
          });
        } catch (err) {
          next(err);
        }
      });
    });
  } catch (err) {
    next(err);
  }
});

router.post('/refresh-token', (req, res, next) => {
  const postData = req.body;
  if (!postData.refreshToken) {
    res.send(422).send('Missing refresh token');
  }
  const user = {
    email: postData.email,
  };
  jwt.verify(
    postData.refreshToken,
    refreshTokenSecret,
    { algorithms: process.env.ALGORITHM },
    (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ error: true, message: 'Unauthorized access.' });
      }
    }
  );

  // generate new token
  const token = signAccessToken(user, secret);
  const response = {
    token,
    refreshToken: postData.refreshToken,
  };
  res.status(200).json(response);
});

router.post('/token', (req, res, next) => {
  const postData = req.body;
  const user = {
    email: postData.email,
    password: postData.password,
  };
  const token = signAccessToken(user, secret);
  const refreshToken = signRefreshToken(user, refreshTokenSecret);
  res.status(200).json({
    token,
    refreshToken,
  });
});

export default router;
