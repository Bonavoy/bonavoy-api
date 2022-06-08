import User from '../models/user';
import { MongoUser } from '../../../types/models';

export const createUser = async (user: MongoUser) => {
  return await User.create({
    email: user.email,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    password: user.password,
    userImage: null,
  });
};

export const getUser = async (query: object) => {
  return await User.find(query);
};

export const getOneUser = async (query: object) => {
  return await User.findOne(query);
};

export const updateUser = () => {};

export const deleteUser = () => {};
