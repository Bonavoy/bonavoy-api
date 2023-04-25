import { AccessControl } from '@bonavoy/accesscontroller'
import { verifyAccessToken, verifyRefreshToken } from '@bonavoy/auth/auth'
import datasources from '@bonavoy/graphql/datasources'
import { prisma } from '@bonavoy/graphql/datasources/database'
import { AuthContext } from '@bonavoy/types/auth'
import { Request, Response } from 'express'

export const getContext = async ({ req, res }: { req: Request; res: Response }) => {
  let auth: AuthContext = {
    sub: null,
    username: null,
    iat: null,
    exp: null,
    refresh: {
      sub: null,
      iat: null,
      exp: null,
    },
  }

  if (req.signedCookies?.[process.env.REFRESH_TOKEN_NAME as string]) {
    //access token
    const { token } = verifyAccessToken(req.signedCookies?.[process.env.ACCESS_TOKEN_NAME as string])
    //refresh token
    const { refresh } = verifyRefreshToken(req.signedCookies?.[process.env.REFRESH_TOKEN_NAME as string])
    auth = { ...token, refresh: { ...refresh } }
  }

  const accessControl = new AccessControl(prisma)

  return { auth, req, res, dataSources: datasources, accessControl }
}
