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
  } catch (err) {
    next(err);
  }
});

export default router;
