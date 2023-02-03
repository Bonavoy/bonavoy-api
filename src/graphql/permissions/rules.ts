import { rule } from 'graphql-shield'

import { Context } from '@bonavoy/types/auth'

export const isAuthenticated = rule({ cache: 'contextual' })(async (_parent: unknown, _args: unknown, ctx: Context) => {
  //basically see if ACESS TOKEN has a user id once verified in context of grapgql

  //checks if there is a valid auth token
  if (ctx.auth.sub) return true
  //if no auth token, check if we have a valid refresh token
  else if (!ctx.auth.sub && ctx.auth.refresh.sub) return 'Token expired!'
  return false
})

export const isSession = rule({ cache: 'contextual' })(async (_parent: unknown, _args: unknown, ctx: Context) => {
  //basically see if REFRESH TOKEN has a user id once verified in context of grapgql
  //this is mainly here for the token mutation
  return !!ctx.auth.refresh.sub
})
