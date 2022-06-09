import express from "express";
import dotenv from "dotenv";

import { addNewsletter } from "../graphql/datasources/database/crud/newsletter";

dotenv.config();
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
    addNewsletter(req.body.email);
    return res.status(201).send("Email added to newsletter");
  } catch (err) {
    console.log(err)
    next(err);
  }
});

export default router;
