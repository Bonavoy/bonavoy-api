import Newsletter from '../models/newsletter';

export const addNewsletter = async (email: string) => {
  return await Newsletter.create({
    email,
  })
    .then((res) => res)
    .catch((err) => err);
};
