import fs from 'fs'
import jwt, { Algorithm, VerifyErrors } from 'jsonwebtoken'
import 'dotenv/config'

//types
import { TokenPayload, TokenDecoded, RefreshDecoded } from '../types/auth'
import { User } from '@prisma/client'

const secret = fs.readFileSync('secret.key', 'utf-8')
const refreshTokenSecret = fs.readFileSync('refreshTokenSecret.key', 'utf-8')

//what we want to store on access token from the user doc
export const tokenPayloadBuilder = (user: User): TokenPayload => {
  return {
    username: user.username,
    sub: user.id,
  }
}

//access token will store more specific data
export const signAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, secret, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
    algorithm: process.env.ALGORITHM as Algorithm,
  })
}

//refresh token will only store user id
export const signRefreshToken = (sub: string) => {
  return jwt.sign({ sub }, refreshTokenSecret, {
    expiresIn: process.env.REFRESH_TOKEN_LIFETIME,
    algorithm: process.env.ALGORITHM as Algorithm,
  })
}

export const verifyAccessToken = (
  tokenStr: string,
): {
  token: TokenDecoded
  tokenError: VerifyErrors | null
} => {
  return jwt.verify(tokenStr, secret, { algorithms: [process.env.ALGORITHM as Algorithm] }, (err, decoded) => {
    return { token: decoded, tokenError: err }
  }) as unknown as {
    token: TokenDecoded
    tokenError: VerifyErrors | null
  }
}

export const verifyRefreshToken = (
  refreshStr: string,
): {
  refresh: RefreshDecoded
  refreshError: VerifyErrors | null
} => {
  return jwt.verify(
    refreshStr,
    refreshTokenSecret,
    { algorithms: [process.env.ALGORITHM as Algorithm] },
    (err, decoded) => {
      return { refresh: decoded, refreshError: err }
    },
  ) as unknown as {
    refresh: RefreshDecoded
    refreshError: VerifyErrors | null
  }
}
