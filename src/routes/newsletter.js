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
 * /newsletter/add:
 *   post:
 *      tags:
 *         - Newsletter
 *      summary: adds a user to newsletter
 *      description: Using user's email, adds to newsletter database
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  email:
 *                    type: string
 *                    description: Users email
 *                    example: test@bonavoy.com
 */
router.post("/add", async (req, res, next) => {
  try {
    const email = req.body.email;
    return res.status(201).json({
      email,
    });
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

export default router;
