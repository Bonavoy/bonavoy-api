import fs from "fs";
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { signAccessToken, signRefreshToken } from "../utils/auth";
import * as crud from "../database/crud/user";

dotenv.config();
const secret = fs.readFileSync("secret.key", "utf-8");
const refreshTokenSecret = fs.readFileSync("refreshTokenSecret.key", "utf-8");
const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *      tags:
 *         - Authentication
 *      summary: Sign up a new user
 *      description: Send new user details to create an account and receive the new user data, refresh and access token
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  email:
 *                    type: string
 *                    description: Users email
 *                    example: test@email.com
 *                  username:
 *                    type: string
 *                    description: Users username
 *                    example: jj_abrams117
 *                  firstname:
 *                    type: string
 *                    description: Users firstname
 *                    example: JJ
 *                  lastname:
 *                    type: string
 *                    description: Users lastname
 *                    example: Abrams
 *                  refreshToken:
 *                    type: string
 *                    description: refresh token
 *                    example: <JWT_TOKEN>
 *                  token:
 *                    type: string
 *                    description: access token
 *                    example: <JWT_TOKEN>
 */
router.post("/signup", async (req, res, next) => {
  try {
    const user = req.body;
    if (user.password !== user.confirmPassword) {
      return res
        .status(400)
        .json({ status: 1, message: "Passwords do not match" });
    }
    const existingEmails = await crud.getOneUser({ email: user.email });
    const existingUsernames = await crud.getOneUser({
      username: user.username,
    });

    if (existingEmails) {
      return res.status(400).json({ status: 1, message: "Email exists" });
    }
    if (existingUsernames) {
      return res.status(400).json({ status: 1, message: "Username exists" });
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

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *      tags:
 *         - Authentication
 *      summary: Get new access token with refresh token
 *      description: Get new access token with refresh token
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  refreshToken:
 *                    type: string
 *                    description: refresh token
 *                    example: <JWT_TOKEN>
 *                  token:
 *                    type: string
 *                    description: refresh token
 *                    example: <JWT_TOKEN>
 */
router.post("/refresh-token", async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.refreshToken) {
      return res
        .send(422)
        .json({ status: 1, message: "Missing refresh token" });
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
            .json({ error: 1, message: "Unauthorized access." });
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

/**
 * @swagger
 * /auth/token:
 *   post:
 *      tags:
 *         - Authentication
 *      summary: Request new access and refresh tokens with user credentials
 *      description: Request new access and refresh tokens with user credentials
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  email:
 *                    type: string
 *                    description: users email
 *                    example: test@email.com
 *                  password:
 *                    type: string
 *                    description: users password
 *                    example: verycool123
 */
router.post("/token", async (req, res, next) => {
  try {
    const postData = req.body;
    const dbUser = await crud.getOneUser({ username: postData.username });
    if (!dbUser) {
      return res.status(404).json({ error: 1, message: "User not found" });
    }

    bcrypt.compare(postData.password, dbUser.password, (err, results) => {
      if (err) {
        next(err);
      }
      if (results) {
        const user = {
          email: postData.email,
        };
        const token = signAccessToken(user, secret);
        const refreshToken = signRefreshToken(user, refreshTokenSecret);
        return res.status(200).json({
          token,
          refreshToken,
        });
      } else {
        return res
          .status(401)
          .json({ error: 1, message: "Invalid credentials" });
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
