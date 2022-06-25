import { rule } from 'graphql-shield'

import { Context } from '../../types/auth'

export const isAuthenticated = rule({ cache: 'contextual' })(async (_parent: unknown, _args: unknown, ctx: Context) => {
  //basically see if ACESS TOKEN has a user id once verified in context of grapgql
  return !!ctx.auth.sub
})

export const isSession = rule({ cache: 'contextual' })(async (_parent: unknown, _args: unknown, ctx: Context) => {
  //basically see if REFRESH TOKEN has a user id once verified in context of grapgql
  //this is mainly here for the token mutation
  return !!ctx.auth.refresh.sub
})
