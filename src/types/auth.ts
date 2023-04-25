import { Request, Response } from 'express'
import { BonavoyDataSources } from '@bonavoy/graphql/datasources'
import { AccessController } from '@bonavoy/accesscontroller'

export interface Context {
  auth: AuthContext
  req: Request
  res: Response
  dataSources: BonavoyDataSources
  accessControl: AccessController
}

export interface TokenPayload {
  sub: string | null
  username: string | null
}

export interface TokenDecoded extends TokenPayload {
  iat: number | null
  exp: number | null
}

export interface AuthContext extends TokenDecoded {
  refresh: {
    sub: string | null
    iat: number | null
    exp: number | null
  }
}

export interface RefreshPayload {
  sub: string | null
}
export interface RefreshDecoded extends RefreshPayload {
  iat: number | null
  exp: number | null
}
