import Session from '../models/session';

export const createSession = async (session) => {
  return await Session.create({
    user: session.user,
    token: session.token,
    expireAt: session.expiry,
  });
};

export const getSession = async (query) => {
  return await Session.findOne(query);
};
