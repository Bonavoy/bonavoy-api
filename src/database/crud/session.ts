import Session from '../models/session';

export const createSession = async (session: {
  user: string;
  token: string;
  expireAt: Date;
}) => {
  return await Session.create({
    user: session.user,
    token: session.token,
    expireAt: session.expireAt,
  });
};

export const getSession = async (query: object) => {
  return await Session.findOne(query);
};
