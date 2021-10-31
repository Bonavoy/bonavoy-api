import fs from 'fs';
import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

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
          const payload = { email: newUserDetails.email };
          const token = signAccessToken(payload, secret);
          const refreshToken = signRefreshToken(payload, refreshTokenSecret);
          return res.status(201).json({
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

router.post('/refresh-token', async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.refreshToken) {
      return res.send(422).send('Missing refresh token');
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
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.post('/token', async (req, res, next) => {
  try {
    const postData = req.body;
    const dbUser = crud.getUser({ emaiL: postData.email });
    if (!dbUser) {
      return res.send(404).json({ error: true, message: 'User not found' });
    }

    const user = {
      email: postData.email,
    };
    const token = signAccessToken(user, secret);
    const refreshToken = signRefreshToken(user, refreshTokenSecret);
    return res.status(200).json({
      token,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
