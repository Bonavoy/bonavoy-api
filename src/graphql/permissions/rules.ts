import { rule } from 'graphql-shield';

import { AuthContext } from '../../types/auth';

export const isAuthenticated = rule()(
  async (
    _parent: unknown,
    _args: unknown,
    { ctx, req, res }: { ctx: AuthContext; req: Request; res: Response },
    info: unknown
  ) => {
    //basically see if ACESS TOKEN has a user id once verified in context of grapgql
    return !!ctx.sub;
  }
);
