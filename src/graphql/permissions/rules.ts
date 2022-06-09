import { rule } from 'graphql-shield';

import { Context } from '../../types/auth';

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent: unknown, _args: unknown, ctx: Context, _info: unknown) => {
    //basically see if ACESS TOKEN has a user id once verified in context of grapgql
    return !!ctx.auth.sub;
  }
);
