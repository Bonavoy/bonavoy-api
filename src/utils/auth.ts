import fs from "fs";
import jwt, { Algorithm, VerifyErrors } from "jsonwebtoken";

//types
import { TokenPayload, TokenDecoded, RefreshDecoded } from "../types/auth";
import { User, Session } from "@prisma/client";

import dotenv from "dotenv";
dotenv.config();

const secret = fs.readFileSync("secret.key", "utf-8");
const refreshTokenSecret = fs.readFileSync("refreshTokenSecret.key", "utf-8");

//what we want to store on access token from the user doc
export const tokenPayloadBuilder = (user: User): TokenPayload => {
  return {
    username: user.username,
    sub: user.id,
  };
};

//using refresh token and checking if in db and right user.
export const validateUserSession = async (
  refresh: string,
  sub: string
): Promise<User | null> => {
  //get user and all sessions with the same id from token

  

  // const userAndSessions = (
  //   await User.aggregate([
  //     { $match: { _id: new mongoose.Types.ObjectId(sub) } },
  //     {
  //       $lookup: {
  //         from: "sessions",
  //         localField: "_id",
  //         foreignField: "user",
  //         as: "sessions",
  //       },
  //     },
  //   ])
  // )[0];

  // if nothing found, return null
  if (!userAndSessions) return null;

  // if any of the sessions include the current refresh token, send back true
  if (
    userAndSessions?.sessions.some(
      (session: Session) => session.token === refresh
    )
  ) {
    return userAndSessions;
  }

  return null;
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
  tokenError: VerifyErrors | null;
} => {
  return jwt.verify(
    tokenStr,
    secret,
    { algorithms: [process.env.ALGORITHM as Algorithm] },
    (err, decoded) => {
      return { token: decoded, tokenError: err };
    }
  ) as unknown as {
    token: TokenDecoded;
    tokenError: VerifyErrors | null;
  };
};

export const verifyRefreshToken = (
  refreshStr: string
): {
  refresh: RefreshDecoded;
  refreshError: VerifyErrors | null;
} => {
  return jwt.verify(
    refreshStr,
    refreshTokenSecret,
    { algorithms: [process.env.ALGORITHM as Algorithm] },
    (err, decoded) => {
      return { refresh: decoded, refreshError: err };
    }
  ) as unknown as {
    refresh: RefreshDecoded;
    refreshError: VerifyErrors | null;
  };
};
