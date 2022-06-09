import { rule, inputRule } from 'graphql-shield';

import { Context } from '../../types/auth';
// import { MongoUser } from '../datasources/database/models/user';

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent: unknown, _args: unknown, ctx: Context, _info: unknown) => {
    //basically see if ACESS TOKEN has a user id once verified in context of grapgql
    return !!ctx.auth.sub;
  }
);

export const isNotAlreadyRegistered = inputRule()(
  (yup, ctx) =>
    yup.object({
      input: yup.object<{ email: string; username: string }>({
        email: yup
          .string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        username: yup
          .string()
          .required('Username is required')
          .max(21, 'Maximum of 21 characters')
          .min(3, 'Minimum of 3 characters')
          .notOneOf(['shanuk'], 'Username already exists.'),
      }),
    }),
  { abortEarly: true }
);
