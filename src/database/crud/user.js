import User from '../models/user';

export const createUser = async (user) => {
  return await User.create({
    email: user.email,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    password: user.password,
    userImage: null,
  });
};

export const getUser = async (query) => {
  return await User.find(query);
};

export const getOneUser = async (query) => {
  return await User.findOne(query);
};

export const updateUser = () => {};

export const deleteUser = () => {};
