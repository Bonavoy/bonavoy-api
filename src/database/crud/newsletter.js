import Newsletter from "../models/newsletter";

export const addNewsletter = async (email) => {
  return await Newsletter.create({
    email,
  });
};
