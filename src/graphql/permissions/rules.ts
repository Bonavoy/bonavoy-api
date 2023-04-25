import { rule } from 'graphql-shield'
import { GraphQLError } from 'graphql'

import { Context } from '@bonavoy/types/auth'
import { TOKEN_EXPIRED, UNAUTHENTICATED } from '@bonavoy/apollo/errors/codes'

export const isAuthenticated = rule({ cache: 'contextual' })(async (_parent: unknown, _args: unknown, ctx: Context) => {
  //basically see if ACESS TOKEN has a user id once verified in context of grapgql
  if (ctx.auth.sub) {
    // good access token
    return true
  } else {
    if (ctx.auth.refresh.sub) {
      // bad access token and good refresh
      throw new GraphQLError('Token expired!', { extensions: { code: TOKEN_EXPIRED } })
    } else {
      // bad access token and bad refresh
      throw new GraphQLError('You are not authenticated!', { extensions: { code: UNAUTHENTICATED } })
    }
  }
})

export const isSession = rule({ cache: 'contextual' })(async (_parent: unknown, _args: unknown, ctx: Context) => {
  //basically see if REFRESH TOKEN has a user id once verified in context of grapgql
  //this is mainly here for the token mutation
  return !!ctx.auth.refresh.sub
})
