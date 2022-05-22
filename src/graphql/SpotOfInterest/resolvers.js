const queries = {
  spotOfInterest: async (_, args, { dataSources }) => {
    const { input } = args;
    const options = {
      coords: input.coords,
    };
    const res = await dataSources.foursquareAPI.getSpotsOfInterest(options);
    return res;
  },
};

const mutations = {
  addSpotOfInterest: (_, args) => {},
};

export const resolvers = { queries, mutations };
