const queries = {
  spotOfInterest: (_, args, { dataSources }) => {
    console.log('here');
    // const res = await dataSources.foursquareAPI.getSpotsOfInterest({});
    // console.log(res);
    return {};
  },
};

const mutations = {
  addSpotOfInterest: (_, args) => {},
};

export const resolvers = { queries, mutations };
